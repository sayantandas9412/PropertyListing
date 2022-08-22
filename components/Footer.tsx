import { Box, Icon } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <Box
      bg="background.100"
      p="1rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="primary.heading"
      width="100%"
      height="60px"
    >
      <Box pr="0.5rem">Made with </Box>
      <Icon as={AiFillHeart} color="orangered" />
      <Box ml="0.5rem">{`PropertyListings`}</Box>
      <Icon as={AiOutlineCopyrightCircle} ml="0.5rem" />
    </Box>
  );
};

export default Footer;
