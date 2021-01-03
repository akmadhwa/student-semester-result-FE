import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../components/LayOut";
import StudentList from "../components/StudentList";
import withAuth from "../components/withAuth";
import { userRoles } from "../config/constant";
import { callApiWithAuth } from "../helpers/axios";

const student = ({ userData }) => {
  const toast = useToast();
  const [studentData, setStudentData] = useState([]);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRegistrationNumber, setNewRegistrationNumber] = useState("");
  const [isUpdated, setIsUpdated] = useState(0);

  useEffect(() => {
    callApiWithAuth.get("/v1/student").then(({ data }) => {
      setStudentData(data.data);
    });
  }, [isUpdated]);

  const handleDeleteStudent = (studentId) => {
    callApiWithAuth.delete(`/v1/student/${studentId}`).then((res) => {
      const newStudentList = studentData.filter((student) => {
        return student.id !== studentId;
      });
      setStudentData(newStudentList);

      setIsOpenDeleteAlert(false); //close after successfully delete

      toast({
        title: `Successfully Delete student`,
        description: "We've successfully delete the student",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  const handleEditStudent = (studentId) => {
    const body = {};

    newName ? (body.name = newName) : "";
    newEmail ? (body.email = newEmail) : "";
    newRegistrationNumber
      ? (body.student_registration_number = newRegistrationNumber)
      : "";

    callApiWithAuth
      .patch(`/v1/student/${studentId}`, body)
      .then((res) => {
        setIsEditModalOpen(false); //close after successfully delete
        setNewName();
        setNewRegistrationNumber();
        setNewEmail();
        setIsUpdated(1);

        toast({
          title: `Successfully Edit student`,
          description: "We've successfully delete the student",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "An error occurred.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Layout userData={userData}>
      <Box px={{ base: "50px", lg: "100px" }} mt={10}>
        <Heading>Student List</Heading>
        <Text>List of all active students</Text>
        <StudentList
          studentData={studentData}
          isOpenDeleteAlert={isOpenDeleteAlert}
          setIsOpenDeleteAlert={setIsOpenDeleteAlert}
          handleDeleteStudent={handleDeleteStudent}
          handleEditStudent={handleEditStudent}
          newName={newName}
          setNewName={setNewName}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          newRegistrationNumber={newRegistrationNumber}
          setNewRegistrationNumber={setNewRegistrationNumber}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
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
