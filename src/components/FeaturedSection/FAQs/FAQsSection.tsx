import { useState } from "react";

import StyledText from "@/components/Shared/Text/StyledText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";

const FAQS = [
  {
    panel: "panel-1",
    summary: "Where are you located?",
    details:
      "Our pickup location is in Rosedale, Md. You can call beforehand and after to confirm your order and pickup. One of our team members will be available to release the product to you.",
  },
  {
    panel: "panel-2",
    summary: "What happens if I'm not satisfied?",
    details:
      "If your product is/was damaged Out of the box (OOTB) you can replace it. We understand this can be frustrating, but we ask that you please provide proof of damage.",
  },
  {
    panel: "panel-3",
    summary: "Does the bike come with a fitness app?",
    details:
      "Yes, there is suppose to be a fitness trial and app that is 100% optional. Please note we do not promote this aspect and it is not guaranteed as apart of our customer service when troubleshooting such issues.",
  },
];

const FaqSection = () => {
  const [panel, setPanel] = useState<string | boolean>("panel-0");

  const handlePanelChange =
    (tab: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setPanel(isExpanded ? tab : false);
    };

  return (
    <Grid container direction="row" alignItems="center">
      <Grid size={5}>
        {FAQS.map((faq, i) => (
          <Accordion
            key={`${panel}-${i}`}
            expanded={panel === faq.panel}
            onChange={handlePanelChange(faq.panel)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <StyledText variant="subtitle1">{faq.summary}</StyledText>
            </AccordionSummary>
            <AccordionDetails>
              <StyledText variant="subtitle2">{faq.details}</StyledText>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
      <Divider
        flexItem
        orientation="vertical"
        sx={{
          margin: "1rem auto",
        }}
      />
      <Grid size={6}>
        <Box sx={{ borderRadius: 5, border: "1px solid #b1b1b1" }}>
          <CardMedia
            component="img"
            src="mihe_faqs.svg"
            alt="mihe-rider"
            sx={{
              width: "100%",
              height: "100%",
              margin: "0 auto",
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FaqSection;
