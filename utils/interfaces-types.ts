export type LayoutProps = {
  children: React.ReactNode;
};

export interface Tier {
  title: string;
  subheader?: string;
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
