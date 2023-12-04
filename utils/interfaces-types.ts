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
