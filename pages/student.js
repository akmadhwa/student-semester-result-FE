import { Box, Heading, Text } from "@chakra-ui/react";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/LayOut";
import StudentList from "../components/StudentList";
import withAuth from "../components/withAuth";
import { userRoles } from "../config/constant";
import { callApiWithAuth } from "../helpers/axios";

const student = ({ userData }) => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    callApiWithAuth.get("/v1/student").then(({ data }) => {
      console.log(data.data);
      setStudentData(data.data);
    });
  }, []);

  return (
    <Layout userData={userData}>
      <Box px={{ base: "50px", lg: "100px" }} mt={10}>
        <Heading>Student List</Heading>
        <Text>List of all active students</Text>
        <StudentList studentData={studentData} />
      </Box>
    </Layout>
  );
};

student.getInitialProps = async ({ userData, server, res }) => {
  if (!(userData.data.roles === userRoles.admin)) {
    res.writeHead(307, { Location: "/" });
    res.end();
  }
};

export default withAuth(student);
