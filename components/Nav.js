import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { userRoles } from "../config/constant";
import Link from "next/link";
import { destroyCookie } from "nookies";
import Router from "next/router";
import { callApiWithAuth } from "../helpers/axios";

const MenuItems = ({ children, link }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    <Link href={link}>{children}</Link>
  </Text>
);

const Header = ({ userData }) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const { data } = userData;

  const onLogout = () => {
    callApiWithAuth.post("/logout").then((result) => {
      destroyCookie({}, "_token");
      Router.replace("/login");
    });
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Student Result System
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        {data.roles === userRoles.student ? (
          <></>
        ) : (
          <>
            <MenuItems link="/">Dashboard</MenuItems>
            <MenuItems link="/student">Student</MenuItems>
            <MenuItems link="/subject">Subject</MenuItems>
          </>
        )}
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px" onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
