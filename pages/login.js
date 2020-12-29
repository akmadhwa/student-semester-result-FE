// React
import { useForm } from "react-hook-form";
import { useState } from "react";

import router from "next/router";
import axios from "axios";

// Components
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  ScaleFade,
} from "@chakra-ui/react";
import { setTheCookie } from "../helpers/cookies";

export default function login() {
  const { handleSubmit, errors, register, formState } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    // axios.defaults.withCredentials = true;

    await axios;
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/login", values, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((data) => {
        setTheCookie({}, "_token", data.data.access_token);
        // router.replace("/");
        window.location.replace("/");
      })
      .catch(function (error) {
        console.log(error);
        setError("Email or password is wrong");
      });
  };

  const handleOnFocus = () => {
    setError(false);
  };

  return (
    <>
      <Flex width="full" align="center" justifyContent="center" h="100vh">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left" minWidth={{ base: "100%", md: "400px" }}>
            {error && (
              <ScaleFade initialScale={0.9} in={error}>
                <Alert status="error" mb="3">
                  <AlertIcon />
                  {error}
                </Alert>
              </ScaleFade>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="test@test.com"
                  ref={register({ required: true })}
                  onFocus={handleOnFocus}
                />
                <FormErrorMessage>
                  {errors.email && "This field is required"}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password} mt={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="*******"
                  ref={register({ required: true })}
                  onFocus={handleOnFocus}
                />
                <FormErrorMessage>
                  {errors.password && "This field is required"}
                </FormErrorMessage>
              </FormControl>
              <Button
                width="full"
                mt={4}
                type="submit"
                colorScheme="teal"
                isLoading={formState.isSubmitting}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
