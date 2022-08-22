import { Box } from "@chakra-ui/react";

const Layout = (props: { children: any }) => (
  <Box mx={["0", "0rem", "0", "2.5rem"]} mt="1.5rem">
    {props.children}
  </Box>
);

export default Layout;
