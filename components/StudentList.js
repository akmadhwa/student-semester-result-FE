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
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const StudentList = ({ studentData }) => {
  return (
    <Box mt={5}>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Student Name</Th>
            <Th>Registration Number</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentData.map((data) => (
            <Tr key={data.id}>
              <Td>{data.name}</Td>
              <Td>{data.student_registration_number}</Td>
              <Td>
                <Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="teal"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<Icon as={FaRegEdit} />}
                  />
                  <IconButton
                    variant="ghost"
                    colorScheme="teal"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<Icon as={MdDelete} />}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StudentList;
