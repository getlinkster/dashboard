"use client";

import { ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import { tiers, boosters } from "utils/constants";
import useSubscribe from "@/utils/evm";
import {
  SubscriptionType,
  SubscriptionTier,
  SubscriptionData,
} from "@/utils/interfaces-types";

import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

import { useAccount, useNetwork } from "wagmi";
import { useRouter } from "next/router";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";

require("dotenv").config();

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

interface AvatarProps {
  imageUrl: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl = null }) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        style={{
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "inline",
        }}
      />
    );
  }
};

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { chain } = useNetwork();
  const { subscribe, getSubscription } = useSubscribe();

  const [isLoading, setIsLoading] = useState(true);
  const [ensName, setEnsName] = useState(null);
  const [ensAvatar, setEnsAvatar] = useState("null");
  const [subscriptionData, setSubscriptionData] = useState<any>(0);

  const checkSubscription = async () => {
    const data = await getSubscription();
    setSubscriptionData(data);
  };

  const getENSName = async (address: `0x${string}`) => {
    try {
      const response = await fetch(
        `https://api.everyname.xyz/reverse/social-profile?address=${address}&provider=ens`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "api-key":
              "f6b31783fd5f3a3f2c73df0f4488fab9939e0abe211007175b27d6b7eeddc54b",
          } as HeadersInit,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("ENS Reverse Lookup Data:", data);
        setEnsName(data.socialHandle);
        setEnsAvatar(data.avatar);

        // You can do something with the ENS data here
      } else {
        console.error("Failed to fetch ENS data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching ENS data:", error);
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (!address && openConnectModal) {
        openConnectModal();
        setTimeout(checkWalletConnection, 1000);
      } else {
        if (address) {
          await getENSName(address);
        }
        setIsLoading(false);
        checkSubscription();
      }
    };
    const checkChainConnection = async () => {
      if (chain) {
        if (chain.unsupported && openChainModal) {
          openChainModal();
          setTimeout(checkChainConnection, 1000);
        }
      }
    };

    checkWalletConnection();
    checkChainConnection();
  }, [address, chain]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <LoadingSpinner />}
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Welcome Header */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8 }}>
        <Typography
          component="h5"
          variant="h5"
          align="center"
          color="#9c27b0"
          gutterBottom
        >
          Welcome,
          {"\n"}
          <Avatar imageUrl={ensAvatar} /> {!ensName ? address : ensName}
          {"\n"}
        </Typography>
      </Container>
      {/* Header */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 0, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Subscription Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Tailor your plan to match your unique needs, offering the versatility
          you require for seamless and successful event hosting. Designed for
          event organizers.
        </Typography>
      </Container>
      {/* Pricing - Event Organizers */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    disabled={
                      tier.tier === subscriptionData[0]?.subscriptionTier
                    }
                    onClick={() => {
                      subscribe(tier.type, tier.tier);
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Header */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Booster Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Elevate your event networking with our boosters—choose the 10-day
          option or go for the year-long package to enjoy unrestricted
          networking opportunities. Tailored for anyone.
        </Typography>
      </Container>
      {/* Pricing - Users */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {boosters.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "1 year" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    disabled={
                      tier.tier === subscriptionData[1]?.subscriptionTier
                    }
                    onClick={() => {
                      subscribe(tier.type, tier.tier);
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Spacing*/}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      ></Container>
    </ThemeProvider>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
