import {
  SubscriptionTier,
  SubscriptionType,
  Tier,
} from "@/utils/interfaces-types";

export const tiers: Tier[] = [
  {
    title: "Free",
    subheader: "Best for Getting Started",
    price: "0",
    type: SubscriptionType.EVENT,
    tier: SubscriptionTier.NONE,
    description: [
      "5 events / month",
      "50 attendees / event",
      "1 event organizer / event",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Best for Start-Ups",
    price: "19",
    type: SubscriptionType.EVENT,
    tier: SubscriptionTier.LIMITED,
    description: [
      "20 events / month",
      "100 attendees / event",
      "3 event organizers / event",
    ],
    buttonText: "Buy Now",
    buttonVariant: "contained",
  },
  {
    title: "Unlimited",
    subheader: "Best for Large Companies",
    price: "39",
    type: SubscriptionType.EVENT,
    tier: SubscriptionTier.UNLIMITED,
    description: [
      "Unlimited events",
      "Unlimited attendees",
      "Unlimited event organizers",
    ],
    buttonText: "Buy Now",
    buttonVariant: "outlined",
  },
];

export const boosters: Tier[] = [
  {
    title: "Free",
    subheader: "",
    price: "0",
    type: SubscriptionType.NETWORKING,
    tier: SubscriptionTier.NONE,
    description: ["50 messages / connection", "15 conversations / event"],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "10 days",
    subheader: "",
    price: "1.99",
    type: SubscriptionType.NETWORKING,
    tier: SubscriptionTier.LIMITED,
    description: ["Unlimited connections", "Unlimited messages"],
    buttonText: "Buy Now",
    buttonVariant: "contained",
  },
  {
    title: "1 year",
    subheader: "",
    price: "59",
    type: SubscriptionType.NETWORKING,
    tier: SubscriptionTier.UNLIMITED,
    description: ["Unlimited connections", "Unlimited messages"],
    buttonText: "Buy Now",
    buttonVariant: "outlined",
  },
];

export const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "costInEther",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethPriceInUSD",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceInUSD",
        type: "uint256",
      },
    ],
    name: "Console",
    type: "event",
  },
  {
    inputs: [],
    name: "payout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dataFeed",
        type: "address",
      },
    ],
    name: "setDataFeedAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newPayoutAddress",
        type: "address",
      },
    ],
    name: "setPayoutAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IEvent.SubscriptionType",
        name: "_type",
        type: "uint8",
      },
      {
        internalType: "enum IEvent.SubscriptionTier",
        name: "_tier",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "_subscriber",
        type: "address",
      },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "canCreateEvent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "canMakeContact",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EVENT_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EVENT_LIMITED_SUBSCRIPTION_PRICE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EVENT_UNLIMITED_SUBSCRIPTION_PRICE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainlinkDataFeedLatestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "getSubscriptionInfo",
    outputs: [
      {
        components: [
          {
            internalType: "enum IEvent.SubscriptionType",
            name: "subscriptionType",
            type: "uint8",
          },
          {
            internalType: "enum IEvent.SubscriptionTier",
            name: "subscriptionTier",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "subscriber",
            type: "address",
          },
        ],
        internalType: "struct IEvent.Subscription",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum IEvent.SubscriptionType",
            name: "subscriptionType",
            type: "uint8",
          },
          {
            internalType: "enum IEvent.SubscriptionTier",
            name: "subscriptionTier",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "subscriber",
            type: "address",
          },
        ],
        internalType: "struct IEvent.Subscription",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NETWORKING_BOOSTER_PRICE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NETWORKING_LIMITED_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NETWORKING_UNLIMITED_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NETWORKING_UNLIMITED_SUBSCRIPTION_PRICE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payoutAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IEvent.SubscriptionType",
        name: "",
        type: "uint8",
      },
      {
        internalType: "enum IEvent.SubscriptionTier",
        name: "",
        type: "uint8",
      },
    ],
    name: "subscriptionInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceInUSD",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "subsPerWallet",
    outputs: [
      {
        internalType: "enum IEvent.SubscriptionType",
        name: "subscriptionType",
        type: "uint8",
      },
      {
        internalType: "enum IEvent.SubscriptionTier",
        name: "subscriptionTier",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
