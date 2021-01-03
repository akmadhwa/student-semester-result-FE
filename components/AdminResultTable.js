import withAuth from "./withAuth";
import { callApiWithAuth } from "../helpers/axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import EditStudentMarkModal from "./modals/EditStudentMarkModal";
import DeleteAlert from "./alert/DeleteAlert";

const AdminResultTable = ({
  resultData,
  semester,
  setSemesterResult,
  studentId,
}) => {
  const toast = useToast();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteSemesterAlert, setIsOpenDeleteSemesterAlert] = useState(
    false
  );
  const [currentEditedSubject, setCurrentEditedSubject] = useState([]);

  const handleDeleteSubject = (subjectId) => {
    callApiWithAuth
      .delete(
        `/v1/student/${studentId}/semester/${semester}/subject/${subjectId}`
      )
      .then((result) => {
        let newResultData = resultData.filter(
          (item) => item.subject_id !== subjectId
        );
        setSemesterResult(newResultData);
        toast({
          title: "Successfully Delete",
          description: "We've successfully delete the subject mark.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handelUpdateMarks = (subjectId) => {
    let subjectInfo = resultData.filter(
      (item) => item.subject_id === subjectId
    );
    setCurrentEditedSubject(subjectInfo[0]);

    setIsOpenEditModal(!isOpenEditModal);
  };

  const editSubjectGrade = (subjectId, newGrade) => {
    const result = resultData.map((data) => {
      if (data.subject_id === subjectId) {
        data.grade = newGrade;
      }

      return data;
    });
    setSemesterResult(result);
  };

  const handleDeleteSemester = (studentId, semester) => {
    callApiWithAuth
      .delete(`/v1/student/${studentId}/semester/${semester}`)
      .then((res) => {
        toast({
          title: `Successfully Delete semester ${semester}`,
          description: "We've successfully delete the semester",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setSemesterResult();
      });
  };

  return (
    <>
      <Flex justifyContent="flex-end">
        <Button
          colorScheme="teal"
          size="sm"
          ml={4}
          onClick={() =>
            setIsOpenDeleteSemesterAlert(!isOpenDeleteSemesterAlert)
          }
        >
          Delete semester {semester}
        </Button>
      </Flex>
      <Table variant="simple" mt="20px">
        <TableCaption>Semester Result for semester{semester}</TableCaption>
        <Thead>
          <Tr>
            <Th>Subject</Th>
            <Th isNumeric>Grade</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {resultData &&
            resultData.map((data) => {
              return (
                <Tr key={data.subject_id}>
                  <Td>{data.subject.name}</Td>
                  <Td isNumeric>{data.grade}</Td>
                  <Td w="30px">
                    <Flex justifyContent="flex-end">
                      <Button
                        colorScheme="teal"
                        variant="ghost"
                        size="xs"
                        onClick={() => handleDeleteSubject(data.subject_id)}
                      >
                        Delete Subject
                      </Button>
                      <Button
                        colorScheme="teal"
                        variant="ghost"
                        size="xs"
                        onClick={() => handelUpdateMarks(data.subject_id)}
                      >
                        Edit Marks
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
        <EditStudentMarkModal
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          selectedData={currentEditedSubject}
          studentId={studentId}
          semester={semester}
          editSubjectGrade={editSubjectGrade}
        />
        <DeleteAlert
          isOpen={isOpenDeleteSemesterAlert}
          setIsOpen={setIsOpenDeleteSemesterAlert}
          alertTitle="Are you sure to delete"
          handleDelete={() => handleDeleteSemester(studentId, semester)}
        />
      </Table>
    </>
  );
};

export default withAuth(AdminResultTable);
