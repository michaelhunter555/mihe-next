import StyledText from "@/components/Shared/Text/StyledText";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ExposureIcon from "@mui/icons-material/Exposure";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

type HighlightProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};
const highlights: HighlightProps[] = [
  {
    title: "Manage Intensity",
    description:
      "Increase intensity for a more vigorous workout or decrease it to idly cycle and focus on other tasks",
    icon: <ExposureIcon />,
  },
  {
    title: "Clip-in pedals",
    description:
      "lock-in during your experience with metal pedals that produce a strong grip with no-slip traction.",
    icon: <DirectionsBikeIcon />,
  },
  {
    title: "5-minutes a day",
    description:
      "Just by cycling on your bike for 5-10 minutes a day can improve your overall focus for the day.",
    icon: <MonitorHeartIcon />,
  },
  {
    title: "Easy Local Pickup",
    description: "Opt for store pickup after purchase to save even more",
    icon: <ExposureIcon />,
  },
  {
    title: "Adjusts for Height/Weight",
    description:
      "The mihe fitness has a capacity of 300lbs with the ability to accomodate individuals from 5ft to 6ft 8in",
    icon: <DirectionsBikeIcon />,
  },
  {
    title: "Satisfactory Guarantee",
    description:
      "If you're not happy, you can return the bike for minimal restocking fee.",
    icon: <MonitorHeartIcon />,
  },
];

const HighlightNotes = () => {
  return (
    <Grid container spacing={3}>
      {highlights.map(({ title, description, icon }, i) => (
        <Grid size={4} key={`${title}-${i}`}>
          <Paper
            sx={{
              borderRadius: 5,
              padding: 2,
              gap: 2,
            }}
          >
            <StyledText variant="h6" align="center">
              {title}
            </StyledText>
            <StyledText variant="subtitle1" align="center">
              {icon}
            </StyledText>
            <Divider />
            <StyledText variant="subtitle2">{description}</StyledText>
          </Paper>
        </Grid>
      ))}
      ;
    </Grid>
  );
};

export default HighlightNotes;
