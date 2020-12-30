import withAuth from "./withAuth";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const StudentResultTable = ({ resultData, semester }) => {
  return (
    <Table variant="simple" mt="20px">
      <TableCaption>Semester Result for semester{semester}</TableCaption>
      <Thead>
        <Tr>
          <Th>Subject</Th>
          <Th isNumeric>Grade</Th>
        </Tr>
      </Thead>
      <Tbody>
        {resultData &&
          resultData.map((data) => {
            return (
              <Tr key={data.subject_id}>
                <Td>{data.subject.name}</Td>
                <Td isNumeric>{data.grade}</Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};

export default withAuth(StudentResultTable);
