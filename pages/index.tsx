"use client";

import { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import type { NextPageWithLayout } from "@/pages/_app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
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
import { Tier } from "@/utils/interfaces-types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const tiers: Tier[] = [
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

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [address, router]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <LoadingSpinner />}
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
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
      {/* End hero unit */}
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
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}

      {/* End footer */}
    </ThemeProvider>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
