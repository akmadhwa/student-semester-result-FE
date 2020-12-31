import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import withAuth from "./withAuth";
import { callApiWithAuth } from "../helpers/axios";
import AdminResultTable from "./AdminResultTable";

const StudentResult = ({ userData }) => {
  const [semester, setSemester] = useState();
  const [studentId, setStudentId] = useState();
  const [studentList, setStudentList] = useState([]);
  const [semesterList, setSemesterList] = useState();
  const [semesterResult, setSemesterResult] = useState([]);

  useEffect(async () => {
    const { data } = await callApiWithAuth.get("/v1/student");
    setStudentList(data.data);
  }, []);

  const handleStudentChange = (event) => {
    if (event.target.value) {
      setStudentId(event.target.value);
      setSemesterResult();
      setSemesterList();

      callApiWithAuth
        .get(`/v1/student/semester/${event.target.value}`)
        .then((result) => {
          setSemesterList(result.data.data);
        });
    }
  };

  const handleSemesterChange = (event) => {
    if (event.target.value) {
      setSemester(event.target.value);
      callApiWithAuth
        .get(`/v1/student/${studentId}/semester/${event.target.value}`)
        .then((result) => {
          setSemesterResult(result.data.data);
        });
    }
  };

  return (
    <Box mt="40px" width="100%">
      <Text fontSize="xl">Check Student Result</Text>
      <FormControl mt={2} w={{ md: "100%", lg: "20vw" }}>
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
        <FormControl mt={2} w={{ md: "100%", lg: "20vw" }}>
          <FormLabel>Select Semester</FormLabel>
          <Select
            placeholder="Select Semester"
            onChange={(event) => handleSemesterChange(event)}
          >
            {semesterList.map((value) => (
              <option value={value} key={value}>
                {`${value}`}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {semesterResult && (
        <AdminResultTable
          resultData={semesterResult}
          semester={semester}
          setSemesterResult={setSemesterResult}
          studentId={studentId}
        />
      )}
    </Box>
  );
};

export default withAuth(StudentResult);
