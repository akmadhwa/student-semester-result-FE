import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { callApiWithAuth } from "../../helpers/axios";

const EditStudentMarkModal = ({
  isOpen,
  setIsOpen,
  selectedData,
  studentId,
  semester,
  editSubjectGrade,
}) => {
  const toast = useToast();
  const [grade, setGrade] = useState();

  const handleUpdateMarks = () => {
    // if (0 > grade > 100) {
    //
    // }
    callApiWithAuth
      .patch(
        `/v1/student/${studentId}/semester/${semester}/subject/${selectedData.subject_id}`,
        {
          new_grade: grade,
        }
      )
      .then((result) => {
        toast({
          title: "Successfully Edit",
          // description: "We've successfully delete the subject mark.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        editSubjectGrade(selectedData.subject_id, grade);

        setIsOpen(!isOpen);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          toast({
            title: "Data is Invalid",
            // description: "We've successfully delete the subject mark.",
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        }
        setGrade();
      });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Student Mark</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl id="amount" isRequired>
              <FormLabel>Amount</FormLabel>
              <NumberInput max={99} min={0}>
                <NumberInputField
                  placeholder={selectedData.grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateMarks}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditStudentMarkModal;
