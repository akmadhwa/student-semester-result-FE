import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Layout from "../components/LayOut";
import StudentList from "../components/StudentList";
import withAuth from "../components/withAuth";
import { userRoles } from "../config/constant";
import { callApiWithAuth } from "../helpers/axios";
import AddStudentModal from "../components/modals/AddStudentModal";
import { useForm } from "react-hook-form";

const student = ({ userData }) => {
  const toast = useToast();
  const { handleSubmit, errors, register, formState } = useForm();
  const [studentData, setStudentData] = useState([]);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRegistrationNumber, setNewRegistrationNumber] = useState("");
  const [isUpdated, setIsUpdated] = useState(0);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

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

  const handleAddNewStudent = (data) => {
    callApiWithAuth
      .post(`/v1/student/`, data)
      .then((res) => {
        setIsAddStudentModalOpen(false); //close after successfully delete
        setIsUpdated(1);

        toast({
          title: `Successfully Add student`,
          description: "We've successfully Add the student",
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
        <Flex alignItems="end" justifyContent="flex-end" mb={5} width="100%">
          <Button
            size="sm"
            leftIcon={<BiPlus />}
            onClick={() => setIsAddStudentModalOpen(true)}
          >
            Add Student
          </Button>
        </Flex>
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
          isAddStudentModalOpen={isAddStudentModalOpen}
          setIsAddStudentModalOpen={setIsAddStudentModalOpen}
        />
      </Box>

      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        setIsOpen={setIsAddStudentModalOpen}
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        formState={formState}
        handleAddNewStudent={handleAddNewStudent}
      />
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
