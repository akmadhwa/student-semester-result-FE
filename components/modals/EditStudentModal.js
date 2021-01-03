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
  Input,
} from "@chakra-ui/react";

const EditStudentModal = ({
  isOpen,
  setIsOpen,
  studentData,
  handleEditStudent,
  newName,
  setNewName,
  newEmail,
  setNewEmail,
  newRegistrationNumber,
  setNewRegistrationNumber,
}) => {
  return (
    <>
      <form>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Student</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="name">
                <FormLabel>Student Name</FormLabel>
                <Input
                  placeholder={studentData.name}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder={studentData.email}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="regNumber">
                <FormLabel>Student Registration Number</FormLabel>
                <Input
                  placeholder={studentData.student_registration_number}
                  onChange={(e) => setNewRegistrationNumber(e.target.value)}
                />
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
              <Button variant="ghost" type="submit" onClick={handleEditStudent}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default EditStudentModal;
