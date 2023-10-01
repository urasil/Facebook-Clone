import { Box } from "@mui/material";
import { styled } from "@mui/system";

/** allows us to reuse these set of css components*/
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;