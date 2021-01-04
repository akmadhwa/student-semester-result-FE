import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormControl,
  FormLabel,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const AddStudentModal = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  errors,
  register,
  formState,
  handleAddNewStudent,
}) => {
  const onSubmit = (val) => {
    console.log(val);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleAddNewStudent)}>
          <ModalHeader>Add Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isInvalid={errors.name} isRequired>
              <FormLabel>Student Name</FormLabel>
              <Input
                name="name"
                ref={register({
                  required: "This Field is required",
                  minLength: {
                    value: 10,
                    message: "The minimum length is 10",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="email" isRequired isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                ref={register({
                  required: "This Field is required",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="regNumber"
              isRequired
              isInvalid={errors.student_registration_number}
            >
              <FormLabel>Student Registration Number</FormLabel>
              <Input
                name="student_registration_number"
                ref={register({
                  required: "This Field is required",
                  minLength: {
                    value: 10,
                    message: "The minimum length is 10",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.student_registration_number &&
                  errors.student_registration_number.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="******"
                type="password"
                name="password"
                ref={register({
                  required: "This Field is required",
                  minLength: {
                    value: 10,
                    message: "The minimum length is 10",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
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
            <Button variant="ghost" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddStudentModal;
