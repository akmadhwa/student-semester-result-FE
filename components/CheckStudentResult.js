import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import withAuth from "./withAuth";
import { callApiWithAuth } from "../helpers/axios";
import AdminResultTable from "./AdminResultTable";
import AddStudentGradeModal from "./modals/AddStudentGradeModal";

const StudentResult = ({ userData }) => {
  const [semester, setSemester] = useState();
  const [studentId, setStudentId] = useState();
  const [studentList, setStudentList] = useState([]);
  const [semesterList, setSemesterList] = useState();
  const [semesterResult, setSemesterResult] = useState([]);
  const [isOpenAddGrade, setIsOpenAddGrade] = useState(false);

  useEffect(async () => {
    const { data } = await callApiWithAuth.get("/v1/student");
    setStudentList(data.data);
  }, []);

  const handleStudentChange = (event) => {
    if (!event.target.value) {
      setSemesterList();
      return;
    }
    setStudentId(event.target.value);
    setSemesterResult();
    setSemesterList();

    callApiWithAuth
      .get(`/v1/student/semester/${event.target.value}`)
      .then((result) => {
        setSemesterList(result.data.data);
      });
  };

  const handleSemesterChange = (semester) => {
    if (!semester) {
      setSemesterResult();
      return;
    }

    setSemester(semester);
    callApiWithAuth
      .get(`/v1/student/${studentId}/semester/${semester}`)
      .then((result) => {
        setSemesterResult(result.data.data);
      });
  };

  return (
    <Box mt="40px" width="100%">
      <Text fontSize="xl">Check Student Result</Text>
      <HStack mt={4}>
        <FormControl w={{ md: "100%", lg: "20vw" }}>
          <FormLabel>Select Student</FormLabel>
          <Select
            placeholder="Select Student"
            onChange={(event) => handleStudentChange(event)}
          >
            {studentList.map((value) => (
              <option value={value.id} key={value.id}>
                {`${value.name} - ${value.student_registration_number}`}
              </option>
            ))}
          </Select>
        </FormControl>

        {semesterList && (
          <>
            <FormControl ml={4} w={{ md: "100%", lg: "20vw" }}>
              <FormLabel>Select Semester</FormLabel>
              <Select
                placeholder="Select Semester"
                onChange={(event) => handleSemesterChange(event.target.value)}
              >
                {semesterList.map((value) => (
                  <option value={value} key={value}>
                    {`${value}`}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Flex justifyContent="flex-end" h="100%">
              <Button
                colorScheme="teal"
                size="sm"
                variant="ghost"
                mt={2}
                onClick={() => setIsOpenAddGrade(!isOpenAddGrade)}
              >
                Add new grade
              </Button>
            </Flex>
          </>
        )}
      </HStack>
      {semesterResult && semesterList && (
        <AdminResultTable
          resultData={semesterResult}
          semester={semester}
          setSemesterResult={setSemesterResult}
          studentId={studentId}
        />
      )}
      <AddStudentGradeModal
        isOpen={isOpenAddGrade}
        setIsOpen={setIsOpenAddGrade}
        studentId={studentId}
        handleSemesterChange={handleSemesterChange}
      />
    </Box>
  );
};

export default withAuth(StudentResult);
