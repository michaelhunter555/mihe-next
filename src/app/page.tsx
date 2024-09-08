"use client";
import { useContext, useState } from "react";

import FeaturedBanner from "@/components/FeaturedSection/Banners/FeaturedBanner";
import BenefitsList from "@/components/FeaturedSection/BenefitsList";
import FaqSection from "@/components/FeaturedSection/FAQs/FAQsSection";
import HighlightNotes from "@/components/FeaturedSection/Highlights/PaperBenefits";
import ProductTabs from "@/components/FeaturedSection/ProductTabs/TabsSelector";
import QuantitySelector from "@/components/FeaturedSection/SelectQuantity";
import ImageList from "@/components/ImagesList/ImageList";
import ProductRatings from "@/components/Ratings/Ratings";
import { StyledStack } from "@/components/Shared/FadeIn/StyledFadeIn";
import StyledText from "@/components/Shared/Text/StyledText";
import ShippingMessage from "@/components/ShippingOption/ShippingMessage";
import CountdownTimer from "@/components/Timer/CountdownTimer";
import { AuthContext } from "@/context/auth-context";
import { CartContext } from "@/context/cart/cart-context";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Content, PageContainer } from "../components/Footer/FooterStyles";

export default function Home() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(
    theme.breakpoints.down("sm") || theme.breakpoints.down("md")
  );
  const [imagePath, setImagePath] = useState<string>("/1.jpg");
  const [price, setPrice] = useState<number>(199);
  const [shipping, setShipping] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const handleImagePathChange = (path: string) => {
    setImagePath(path);
  };

  const handleShippingOptions = () => {
    setShipping((prev) => !prev);
    setPrice((prev) => {
      if (shipping === true) {
        return prev - 90;
      } else {
        return prev + 90;
      }
    });
  };

  const handleAddToCart = (quantity: number) => {
    cart.quantity = cart.quantity + quantity;
    cart.quantity = cart.quantity > 0 ? (cart.quantity -= 1) : 0;
  };

  const handleQuantity = (action: string) => {
    //when "+" is clicked
    if (action === "increment") {
      setQuantity((prev) => (prev += 1));
      setPrice((prev) => (prev += shipping ? 199 : 109));
    } else if (action === "decrement") {
      setPrice((prev) => {
        if (quantity > 1) {
          return shipping ? (prev -= 199) : (prev -= 109);
        }
        return shipping ? 199 : 109;
      });
      setQuantity((prev) => (prev > 1 ? (prev -= 1) : 1));
    }
  };

  return (
    <PageContainer>
      <Content>
        <Container maxWidth="lg" sx={{ marginTop: 5 }}>
          <Stack spacing={2}>
            <Stack alignItems="center">
              <StyledText variant="h6">
                Effective Fitness For a{" "}
                <Typography
                  component="span"
                  style={{ color: "#3eb9bd", fontSize: 30 }}
                >
                  Cost Effective Price.
                </Typography>
              </StyledText>
              <StyledText variant="subtitle2">
                Keep the calories off this winter without breaking the bank.
              </StyledText>

              <Stack direction="row" spacing={2} sx={{ margin: "1rem auto" }}>
                <Chip
                  variant="filled"
                  label="Learn more"
                  component="button"
                  onClick={() => console.log("blog item")}
                />
                <Chip
                  variant="outlined"
                  label="FAQs"
                  component="button"
                  onClick={() => console.log("blog item")}
                />
              </Stack>
              <Divider
                flexItem
                sx={{ margin: "0 auto", width: { xs: "100%", md: "50%" } }}
              />
              <StyledStack visible={true} delay={0.1}>
                <FeaturedBanner />
              </StyledStack>
            </Stack>

            <Divider>
              <Stack direction="row" alignItems="center" spacing={1}>
                <StyledText variant="subtitle2">
                  The Mihe X-900 Fitness Bike
                </StyledText>
                <DirectionsBikeIcon />
              </Stack>
            </Divider>

            <StyledStack
              visible={true}
              delay={0.1}
              direction="column"
              spacing={3}
            >
              <Grid container spacing={2}>
                <Grid size={7}>
                  <CardMedia
                    component="img"
                    src={imagePath}
                    alt="featured_image"
                    sx={{
                      width: { xs: "100%", md: "100%" },
                      height: { xs: "100%", md: "100%" },
                      borderRadius: 5,
                      border: "1px solid #b1b1b1",
                    }}
                  />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid size={4}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    sx={{ width: "100%" }}
                    spacing={1}
                  >
                    <StyledText variant="h5">
                      Mihe X-900 Fitness Bike
                    </StyledText>
                    <ProductRatings />
                    <StyledText variant="h4">
                      ${price}.<span style={{ fontSize: 14 }}>00</span>{" "}
                      <s style={{ color: "#b1b1b1" }}>$249.99</s>
                    </StyledText>
                    <CountdownTimer timeLeft={20 * 60 * 1000} />
                    <BenefitsList />
                    <Stack direction="row" spacing={2}>
                      <Chip
                        component="button"
                        clickable
                        onClick={handleShippingOptions}
                        label="Store Pick up"
                        variant={!shipping ? "filled" : "outlined"}
                        color={!shipping ? "primary" : "default"}
                      />
                      <Chip
                        clickable
                        onClick={handleShippingOptions}
                        label="Fed-ex Shipping"
                        variant={shipping ? "filled" : "outlined"}
                        color={shipping ? "primary" : "default"}
                      />
                    </Stack>
                    <ShippingMessage isShipping={shipping} />
                    <Stack direction="row" alignItems="center">
                      <QuantitySelector
                        quantity={quantity}
                        onQuantity={(action: string) => handleQuantity(action)}
                      />
                    </Stack>
                    <Button
                      variant="outlined"
                      sx={{ borderRadius: 10 }}
                      onClick={() => {
                        cart.addToCart({
                          id: 1,
                          quantity: quantity,
                          price: price,
                        });
                        // cart.quantity = cart.quantity += quantity;
                        // cart.totalPrice = cart.totalPrice += price;
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </StyledStack>

            <StyledStack
              visible={true}
              delay={0.3}
              yAxis={5}
              direction="row"
              spacing={1}
            >
              <ImageList
                onImageClick={(imagePath: string) =>
                  handleImagePathChange(imagePath)
                }
              />
            </StyledStack>

            <ProductTabs />

            <Divider>
              <Stack direction="row" spacing={1} alignItems="center">
                <StyledText variant="subtitle2">Highlights</StyledText>
                <AutoAwesomeIcon />
              </Stack>
            </Divider>
            <Stack direction="row" spacing={2}>
              <HighlightNotes />
            </Stack>
            <Divider>
              <Stack direction="row" alignItems="center" spacing={1}>
                <StyledText variant="subtitle2">FAQS</StyledText>
                <LiveHelpIcon />
              </Stack>
            </Divider>
            <FaqSection />
          </Stack>
        </Container>
      </Content>
    </PageContainer>
  );
}
