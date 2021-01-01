import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormControl,
  FormLabel,
  Select,
  NumberInputField,
  NumberInput,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { callApiWithAuth } from "../../helpers/axios";

const AddStudentGradeModal = ({
  isOpen,
  setIsOpen,
  studentId,
  handleSemesterChange,
}) => {
  const toast = useToast();
  const semesterList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [semester, setSemester] = useState();
  const [subjectList, setSubjectList] = useState([]);
  const [subjectId, setSubjectId] = useState();
  const [grade, setGrade] = useState();

  useEffect(async () => {
    const { data } = await callApiWithAuth.get("/v1/subject");
    setSubjectList(data.data);
  }, []);

  const submitSubject = () => {
    callApiWithAuth
      .post(`/v1/student/semester`, {
        student_id: studentId,
        semester: semester,
        results: [
          {
            subject_id: subjectId,
            grade: grade,
          },
        ],
      })
      .then((res) => {
        toast({
          title: `Successfully created `,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        setIsOpen(false);
        handleSemesterChange(semester);
      });
  };

  return (
    <>
      <form>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Grade</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="semester" isRequired>
                <FormLabel>Semester</FormLabel>
                <Select
                  placeholder="Select semester"
                  onChange={(e) => setSemester(e.target.value)}
                >
                  {semesterList.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="subject">
                <FormLabel>Subject</FormLabel>
                <Select
                  placeholder="Select subject"
                  onChange={(e) => setSubjectId(e.target.value)}
                >
                  {subjectList.map((value) => (
                    <option value={value.id} key={value.id}>
                      {value.name} - {value.code}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="amount">
                <FormLabel>Grade</FormLabel>
                <NumberInput max={99} min={0}>
                  <NumberInputField
                    placeholder={89}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setIsOpen(!isOpen)}
              >
                Close
              </Button>
              <Button variant="ghost" type="submit" onClick={submitSubject}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default AddStudentGradeModal;
