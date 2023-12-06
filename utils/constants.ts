import { Tier } from "@/utils/interfaces-types";

export const tiers: Tier[] = [
  {
    title: "Free",
    subheader: "Best for Getting Started",
    price: "0",
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
    description: [
      "20 events / month",
      "100 attendees / event",
      "3 event organizers / event",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Unlimited",
    subheader: "Best for Large Companies",
    price: "39",
    description: [
      "Unlimited events",
      "Unlimited attendees",
      "Unlimited event organizers",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

export const boosters: Tier[] = [
  {
    title: "Free",
    subheader: "",
    price: "0",
    description: ["50 messages / connection", "15 conversations / event"],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "10 days",
    subheader: "",
    price: "1.99",
    description: ["Unlimited connections", "Unlimited messages"],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "1 year",
    subheader: "",
    price: "59",
    description: ["Unlimited connections", "Unlimited messages"],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];
