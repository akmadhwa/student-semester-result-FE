import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteAlert from "./alert/DeleteAlert";
import EditStudentModal from "./modals/EditStudentModal";

const StudentList = ({
  studentData,
  isOpenDeleteAlert,
  setIsOpenDeleteAlert,
  handleDeleteStudent,
  handleEditStudent,
  newName,
  setNewName,
  newEmail,
  setNewEmail,
  newRegistrationNumber,
  setNewRegistrationNumber,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {
  const [clickedStudentButton, setClickedStudentButton] = useState();

  return (
    <Box mt={5}>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Student Name</Th>
            <Th>Registration Number</Th>
            <Th>Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentData.map((data) => (
            <Tr key={data.id}>
              <Td>{data.name}</Td>
              <Td>{data.student_registration_number}</Td>
              <Td>{data.email}</Td>
              <Td>
                <Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="teal"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<Icon as={FaRegEdit} />}
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setClickedStudentButton(data.id);
                    }}
                  />
                  <IconButton
                    variant="ghost"
                    colorScheme="teal"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<Icon as={MdDelete} />}
                    onClick={() => {
                      setIsOpenDeleteAlert(true);
                      setClickedStudentButton(data.id);
                    }}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <DeleteAlert
        isOpen={isOpenDeleteAlert}
        setIsOpen={setIsOpenDeleteAlert}
        alertTitle="Are you sure wants to delete"
        handleDelete={() => handleDeleteStudent(clickedStudentButton)}
      />
      {clickedStudentButton && (
        <EditStudentModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          handleEditStudent={() => handleEditStudent(clickedStudentButton)}
          newName={newName}
          setNewName={setNewName}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          newRegistrationNumber={newRegistrationNumber}
          setNewRegistrationNumber={setNewRegistrationNumber}
          studentData={
            studentData.filter((student) => {
              return student.id === clickedStudentButton;
            })[0]
          }
        />
      )}
    </Box>
  );
};

export default StudentList;
