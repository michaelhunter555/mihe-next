"use client";

import React, { useContext } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AuthContext } from "../../context/auth-context";
import StyledNextLink from "../Shared/Links/StyledNextLink";
import { StyledBox, StyledContainer } from "./HeaderStyles";
import { MainMenuItems } from "./menuItems";

const logoStyle = {
  width: "250px",
  height: "auto",
  cursor: "pointer",
};

type OpenMenuProps = {
  onMobileMenuClick: () => void;
};

const Header = () => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <StyledContainer isMobile={isMobile}>
      {isMobile && (
        <IconButton>
          <MenuIcon />
        </IconButton>
      )}
      <StyledBox>
        <List sx={{ display: "flex" }}>
          {MainMenuItems?.filter((menu) => {
            if (auth.isLoggedIn) {
              return menu.text !== "Login";
            } else {
              return menu.text !== "Logout";
            }
          }).map((menu, i) => (
            <StyledNextLink
              key={`${menu.component}--${i}`}
              route={menu?.route || "#"}
            >
              <ListItem>
                <ListItemText
                  primary={menu.text}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "#b1b1b1",
                    },
                  }}
                />
              </ListItem>
            </StyledNextLink>
          ))}
        </List>
      </StyledBox>
    </StyledContainer>
  );
};

export default Header;
