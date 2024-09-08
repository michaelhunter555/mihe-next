import React, { useState } from "react";

import StyledText from "@/components/Shared/Text/StyledText";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

type ProductTabProps = {
  id: number;
  tabTitle: string;
  tabContent: string;
};

const productTabs: ProductTabProps[] = [
  {
    id: 0,
    tabTitle: "Product Description",
    tabContent: "The Mihe x-900 is changing the game.",
  },
  { id: 1, tabTitle: "Dimensions", tabContent: "Max-Weight: 300lbs" },
  {
    id: 2,
    tabTitle: "Return Policy",
    tabContent:
      "Onyl accepted returns are applicable. Please do not show up unannounced as there is a possibility of no staff members will be available",
  },
  {
    id: 3,
    tabTitle: "Shipping Policy",
    tabContent: "We ship within the greater United Sates.",
  },
];

const allyProps = (index: number) => {
  return {
    id: `product-tab-${index}`,
    "aria-controls": `product-tab-${index}`,
  };
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, index, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ProductTabs = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabClick = (i: number) => setSelectedTab(i);

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={(event: React.SyntheticEvent, val: any) =>
          handleTabClick(Number(val))
        }
      >
        {productTabs.map((tab, i) => (
          <Tab key={i} label={tab.tabTitle} {...allyProps(i)} />
        ))}
      </Tabs>
      <Box
        sx={{
          width: "100%",
          border: "1px solid #b1b1b1",
          borderRadius: 5,
          height: 300,
        }}
      >
        <CustomTabPanel value={selectedTab} index={selectedTab}>
          <StyledText variant="subtitle1">
            {productTabs[selectedTab]?.tabContent}
          </StyledText>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default ProductTabs;
