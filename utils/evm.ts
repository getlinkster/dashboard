import React, { useEffect } from "react";

import { ABI } from "utils/constants";
import { SubscriptionTier, SubscriptionType } from "./interfaces-types";

import {
  createWalletClient,
  createPublicClient,
  http,
  custom,
  parseUnits,
  parseEther,
} from "viem";
import { avalanche, avalancheFuji, polygonMumbai } from "viem/chains";
import "viem/window";
import { useAccount } from "wagmi";
import { usePublicClient } from "wagmi";

const FUJI_CONTRACT_ADDRESS = "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2";
const MUMBAI_CONTRACT_ADDRESS = "0xC047161E02D16271a300af99487022C78Eb55E33";

export function ConnectWalletClient() {
  // Check for window.ethereum
  let transport;
  if (window.ethereum) {
    transport = custom(window.ethereum);
  } else {
    const errorMessage =
      "MetaMask or another web3 wallet is not installed. Please install one to proceed.";
    throw new Error(errorMessage);
  }

  // Delcalre a Wallet Client
  const walletClient = createWalletClient({
    chain: polygonMumbai,
    transport: transport,
  });

  return walletClient;
}

const mapDataToSubscriptionInfo = (
  _type: SubscriptionType,
  _tier: SubscriptionTier
): bigint => {
  switch (_type) {
    case SubscriptionType.EVENT:
      switch (_tier) {
        case SubscriptionTier.LIMITED:
          return BigInt(19);
        case SubscriptionTier.UNLIMITED:
          return BigInt(39);
        default:
          return BigInt(0);
      }

    case SubscriptionType.NETWORKING:
      switch (_tier) {
        case SubscriptionTier.LIMITED:
          return BigInt(1.99);
        case SubscriptionTier.UNLIMITED:
          return BigInt(59);
        default:
          return BigInt(0);
      }

    default:
      return BigInt(0);
  }
};

export default function useSubscribe() {
  //   const publicClient = usePublicClient();
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http("https://rpc.ankr.com/polygon_mumbai"),
  });

  const walletClient = ConnectWalletClient();
  const { address: account } = useAccount();

  async function subscribe(_type: SubscriptionType, _tier: SubscriptionTier) {
    try {
      const chainlinkData = await publicClient.readContract({
        address: MUMBAI_CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "getChainlinkDataFeedLatestAnswer",
      });

      console.log(chainlinkData);
      const formatChainlinkData = parseUnits(chainlinkData.toString(), 8);

      const packageCost = mapDataToSubscriptionInfo(_type, _tier);
      let _value = packageCost / formatChainlinkData;
      _value = parseEther(String(_value));

      if (account) {
        const hash = await walletClient.writeContract({
          address: MUMBAI_CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "subscribe",
          args: [_type, _tier, account],
          account: account,
          value: _value,
        });
        console.log(hash);
      }

      console.log("Transaction mined!");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return { subscribe };
}
