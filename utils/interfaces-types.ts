export type LayoutProps = {
  children: React.ReactNode;
};

export interface Tier {
  title: string;
  subheader?: string;
  type: SubscriptionType;
  tier: SubscriptionTier;
  price: string;
  description: string[];
  buttonText: string;
  buttonVariant: "outlined" | "contained";
}

export enum SubscriptionType {
  EVENT = 0,
  NETWORKING = 1,
}

export enum SubscriptionTier {
  NONE = 0,
  LIMITED = 1,
  UNLIMITED = 2,
}

export interface SubscriptionData {
  endDate: bigint;
  subscriber: string;
  subscriptionTier: SubscriptionTier;
  subscriptionType: SubscriptionType;
}
