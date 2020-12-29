import withAuth from "../components/withAuth";
import { Box, Text, Heading, Tag } from "@chakra-ui/react";
import StudentResult from "../components/StudentResult";
import { userRoles } from "../config/constant";

const StudentDashboard = ({ userData }) => {
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

        <Text fontSize="sm" mt={2} color="gray.500">
          Registration Number : {data.student_registration_number}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Email : {data.email}
        </Text>
      </Box>
      <StudentResult studentId={data.id} />
    </Box>
  );
};

export default withAuth(StudentDashboard);
