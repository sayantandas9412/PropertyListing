import { Box, HStack, Icon, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import Logo from "./Logo";

export interface HeaderData {
  navItems: NavItem[];
  logo: Logo;
}
interface Logo {
  title: string;
  href: string;
}

interface NavItem {
  active: boolean;
  title: string;
  href: string;
  icon?: IconType;
  showIcon?: boolean;
}

const Header: FC<HeaderData> = ({ logo, navItems }) => {
  const router = useRouter();
  const mapNavItems = (navItem: NavItem, index: number) => {
    return (
      <ListItem
        key={index}
        display={"flex"}
        alignItems="center"
        fontFamily="primary.heading"
      >
        <Box
          mx="2rem"
          borderBottom={router.pathname === "/" ? "2px solid black" : ""}
        >
          <Link href={navItem.href}>{navItem.title}</Link>
        </Box>
      </ListItem>
    );
  };

  return (
    <HStack justifyContent="space-between" bg="background.100" p="1rem">
      <Logo title={logo.title} href={logo.href} />
      <Box display="flex">
        <UnorderedList
          display="flex"
          listStyleType="none"
          px="2rem"
          alignItems="center"
          pr="1rem"
        >
          <>
            {navItems.map((unit, index) => mapNavItems(unit, index))}
            <ListItem tabIndex={0}>
              <Box
                borderBottom={
                  router.pathname === "/contact-us" ? "2px solid black" : ""
                }
                fontFamily="primary.heading"
              >
                <Link href="/contact-us">Contact Us</Link>
              </Box>
            </ListItem>
          </>
        </UnorderedList>
      </Box>
    </HStack>
  );
};
export default Header;
