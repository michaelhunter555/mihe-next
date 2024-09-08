import { useContext } from "react";

import { Content, PageContainer } from "@/components/Footer/FooterStyles";
import { CartContext } from "@/context/cart/cart-context";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";

import { StyledStack } from "../Shared/FadeIn/StyledFadeIn";
import StyledBoxContainer from "../Shared/Modals/ModalStyles";
import StyledText from "../Shared/Text/StyledText";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const CartModal = ({ open, onClose }: CartModalProps) => {
  const cart = useContext(CartContext);

  return (
    <Modal open={open} onClose={onClose}>
      <StyledBoxContainer width="500px" sx={{ height: "300px" }}>
        <PageContainer minHeight="100%">
          <Content>
            <StyledText variant="h4">Your Cart</StyledText>
            <Divider sx={{ marginBottom: "2rem" }} />
            {cart.quantity === 0 ? (
              <StyledText variant="h6">
                There are no items in your cart
              </StyledText>
            ) : (
              <StyledStack
                visible={true}
                delay={0.3}
                spacing={4}
                direction="row"
              >
                <CardMedia
                  component="img"
                  src="/2.jpg"
                  alt="mihe-cart-img"
                  sx={{ width: 50, height: 50 }}
                />
                <Divider orientation="vertical" />
                <StyledText variant="subtitle2">Mihe X-900</StyledText>
              </StyledStack>
            )}
          </Content>
          <Divider sx={{ margin: "1rem auto", width: "90%" }} flexItem />
          <StyledStack
            visible={true}
            delay={0.3}
            spacing={2}
            direction="row"
            justifyContent={"flex-end"}
          >
            <Chip
              color="error"
              label="Close"
              component="button"
              variant="outlined"
              onClick={onClose}
            />
            <Chip
              disabled={cart.quantity === 0}
              label="Checkout"
              component="button"
              variant="outlined"
              onClick={() => console.log("stripecheckout")}
            />
          </StyledStack>
        </PageContainer>
      </StyledBoxContainer>
    </Modal>
  );
};

export default CartModal;
