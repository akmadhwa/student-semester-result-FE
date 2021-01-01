import withAuth from "../components/withAuth";
import { Box, Text, Heading, Tag } from "@chakra-ui/react";
import { userRoles } from "../config/constant";
import CheckStudentResult from "./CheckStudentResult";

const AdminDashboard = ({ userData }) => {
  const { data } = userData;
  return (
    <Box mx={{ base: "30px", lg: "40px" }}>
      <Box mt={10}>
        <Heading>
          Welcome, {data.name}
          <Tag size="sm" key="sm" variant="solid" colorScheme="teal">
            {data.roles === userRoles.student ? "Student" : "Admin"}
          </Tag>
        </Heading>
      </Box>
      <CheckStudentResult userData={userData} />
    </Box>
  );
};

export default withAuth(AdminDashboard);
