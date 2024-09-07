"use client";
import React from "react";

interface MenuItemsProps {
  text: string;
  icon?: React.ReactNode;
  component?: string;
  route?: string;
}

export const MainMenuItems: MenuItemsProps[] = [
  {
    text: "Home",
    component: "HOME",
    route: "/",
  },
  {
    text: "products",
    component: "PRODUCTS",
    route: "/products",
  },
  {
    text: "FAQs",
    component: "FAQS",
    route: "/faqs",
  },
  {
    text: "About Us",
    component: "ABOUT",
    route: "/about-us",
  },
  {
    text: "Contact",
    component: "CONTACT",
    route: "/contact",
  },
  {
    text: "Login",
    component: "Login",
    route: "/login",
  },
  {
    text: "Logout",
    component: "LOGOUT",
    route: "/logout",
  },
];
