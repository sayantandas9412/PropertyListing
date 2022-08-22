import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface LogoProps {
  title: string;
  href: string;
}

const Logo: FC<LogoProps> = ({ title, href }) => {
  return (
    <Heading as="h2" size="lg" fontFamily="primary.heading">
      <Link href={href}>{title}</Link>
    </Heading>
  );
};

export default Logo;
