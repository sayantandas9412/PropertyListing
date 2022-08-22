import { Box } from "@chakra-ui/react";
import { FC } from "react";
import Footer from "./Footer";
import Header, { HeaderData } from "./Header";
import Layout from "./Layout";

interface BaseComponentProps {
  children?: any;
}

const BaseComponent: FC<BaseComponentProps> = ({ children }) => {
  const headerData: HeaderData = {
    logo: {
      title: "PropertyListing",
      href: "/",
    },
    navItems: [
      {
        title: "Listings",
        href: "/",
        showIcon: false,
        active: true,
      },
    ],
  };
  return (
    <Layout>
      <Header {...headerData} />
      <Box minH="90vh">{children}</Box>
      <Footer />
    </Layout>
  );
};

export default BaseComponent;
