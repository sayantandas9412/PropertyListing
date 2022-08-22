import { Box, Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

const ContactUs: NextPage = () => {
  return (
    <Flex justifyContent="center" mt="3rem">
      <Heading as="h2">
        Contact Us{" "}
        <Box textDecoration="underline" display="inline-block" color="blue">
          <Link href="https://hello.pricelabs.co/contact-us/">here</Link>
        </Box>
      </Heading>
    </Flex>
  );
};

export default ContactUs;
