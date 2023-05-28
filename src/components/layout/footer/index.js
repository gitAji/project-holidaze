import { Box, Typography } from "@mui/material";
import { useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  console.log(setCurrentYear);
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        backgroundColor: "primary.main",
        color: "other.gray",
        zIndex: 1,
      }}
    >
      <Typography variant="body2" align="center" sx={{ pt: 2, pb: 2 }}>
        © {currentYear} Holidaze. All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
