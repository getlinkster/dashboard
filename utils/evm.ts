"use client";
import React, { useEffect, useState } from "react";

import { ABI } from "utils/constants";
import {
  SubscriptionTier,
  SubscriptionType,
  SubscriptionData,
} from "./interfaces-types";

import {
  createWalletClient,
  createPublicClient,
  http,
  custom,
  formatUnits,
  parseEther,
} from "viem";
import { avalanche, avalancheFuji, polygonMumbai } from "viem/chains";
import "viem/window";
import { useAccount } from "wagmi";
import { usePublicClient } from "wagmi";
import _default from "next/dist/client/router";

const FUJI_CONTRACT_ADDRESS = "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2";
const MUMBAI_CONTRACT_ADDRESS = "0xC047161E02D16271a300af99487022C78Eb55E33";

const mapDataToSubscriptionInfo = (
  _type: SubscriptionType,
  _tier: SubscriptionTier
): number => {
  switch (_type) {
    case SubscriptionType.EVENT:
      switch (_tier) {
        case SubscriptionTier.LIMITED:
          return 19;
        case SubscriptionTier.UNLIMITED:
          return 39;
        default:
          return 0;
      }

    case SubscriptionType.NETWORKING:
      switch (_tier) {
        case SubscriptionTier.LIMITED:
          return 1.99;
        case SubscriptionTier.UNLIMITED:
          return 59;
        default:
          return 0;
      }

    default:
      return 0;
  }
};

export default function useSubscribe() {
  //   const publicClient = usePublicClient();
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http("https://rpc.ankr.com/polygon_mumbai"),
  });

  const { address: account } = useAccount();
  const [walletClient, setWalletClient] = useState<any>(null);

  useEffect(() => {
    if (!walletClient) {
      let _transport;
      if (window?.ethereum) {
        _transport = custom(window.ethereum);
      } else {
        const errorMessage =
          "MetaMask or another web3 wallet is not installed. Please install one to proceed.";
        throw new Error(errorMessage);
      }

      // Delcalre a Wallet Client
      const _walletClient = createWalletClient({
        chain: polygonMumbai,
        transport: _transport,
      });
      setWalletClient(_walletClient);
    }
  }, [walletClient]);

  async function subscribe(_type: SubscriptionType, _tier: SubscriptionTier) {
    try {
      const chainlinkData = await publicClient.readContract({
        address: MUMBAI_CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "getChainlinkDataFeedLatestAnswer",
      });

      console.log(chainlinkData);
      const formatChainlinkData = Number(formatUnits(chainlinkData, 8));

      const packageCost = mapDataToSubscriptionInfo(_type, _tier);
      const costToUser = packageCost / formatChainlinkData;
      const _value = parseEther(String(costToUser));
      console.log(packageCost, formatChainlinkData, _value, "hey");

      if (account) {
        const hash = await walletClient.writeContract({
          address: MUMBAI_CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "subscribe",
          args: [_type, _tier, account],
          account: account,
          value: _value,
        });
        console.log("Transaction mined: ", hash);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getSubscription(_type?: SubscriptionType) {
    try {
      if (account) {
        const subscriptionData = await publicClient.readContract({
          address: MUMBAI_CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "getSubscriptionInfo",
          args: [account],
        });

        console.log(subscriptionData);

        switch (_type) {
          case SubscriptionType.EVENT:
            return subscriptionData[0];
          case SubscriptionType.NETWORKING:
            return subscriptionData[1];
          default:
            return subscriptionData;
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return { subscribe, getSubscription };
}
