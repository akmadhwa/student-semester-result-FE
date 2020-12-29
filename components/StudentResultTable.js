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
          Object.keys(resultData).map((key) => {
            return (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td isNumeric>{resultData[key]}</Td>
              </Tr>
            );
          })}

        {/* <Tr>
          <Td>feet</Td>
          <Td isNumeric>30.48</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td isNumeric>0.91444</Td>
        </Tr> */}
      </Tbody>
    </Table>
  );
};

export default withAuth(StudentResultTable);
