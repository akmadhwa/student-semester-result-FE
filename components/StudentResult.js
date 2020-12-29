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
import StudentResultTable from "./StudentResultTable";

const StudentResult = ({ studentid }) => {
  const [semester, setSemester] = useState("");
  const [semesterList, setSemesterList] = useState([]);
  const [semesterResult, setSemesterResult] = useState({});

  useEffect(async () => {
    const { data } = await callApiWithAuth.get("/v1/user/semester");
    setSemesterList(data.data);
  }, []);

  const handleOnChange = (event) => {
    setSemester(event.target.value);

    if (event.target.value) {
      callApiWithAuth
        .get(`/v1/user/semester-result/${event.target.value}`)
        .then((result) => {
          setSemesterResult(result.data.data);
          //   console.log(semesterResult);
        });
    }
  };

  return (
    <Box mt="40px" width="100%">
      <Text fontSize="xl">Your Result</Text>
      <FormControl id="country" mt={2} w={{ md: "100%", lg: "20vw" }}>
        <FormLabel>Select your semester</FormLabel>
        <Select
          placeholder="Select Semester"
          onChange={(event) => handleOnChange(event)}
        >
          {semesterList.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormControl>

      <StudentResultTable resultData={semesterResult} semester={semester} />
    </Box>
  );
};

export default withAuth(StudentResult);
