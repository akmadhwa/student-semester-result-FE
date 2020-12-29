import { Flex } from "@chakra-ui/react";
import Nav from "../components/Nav";

export default function Layout({ children, userData }) {
  return (
    <>
      <Nav userData={userData} />
      {children}
    </>
  );
}
