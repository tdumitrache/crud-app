import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Tabel = () => {
  const { tabelaId } = useParams();

  const [list, setList] = useState([{}]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/${tabelaId}`).then((res) =>
      setList(res.data)
    );
  }, []);

  const handleToggleCheckbox = (e) => {
    if (ids.indexOf(Number(e.target.value)) === -1) {
      setIds([...ids, Number(e.target.value)]);
    } else {
      setIds(ids.filter((id) => id !== Number(e.target.value)));
    }
  };

  const deleteSelectedElements = () => {
    ids.forEach((id) => {
      Axios.delete(`http://localhost:3001/delete/${tabelaId}/${id}`);
    });
    tabelaId === "students"
      ? setList(list.filter((row) => ids.indexOf(row.id_student) === -1))
      : tabelaId === "departments"
      ? setList(list.filter((row) => ids.indexOf(row.id_department) === -1))
      : setList(list.filter((row) => ids.indexOf(row.id_meeting) === -1));
    
    setIds([]);

    const checkBoxes = document.getElementsByClassName("checkbox");
    for (let i = 0; i <= checkBoxes.length; i++) {
      checkBoxes[i].checked = false;
    }
  };

  return (
    <Container
      maxW="1250px"
      mx="auto"
      display="flex"
      flexDirection="column"
      justify="center"
    >
      <Table variant="striped" colorScheme="gray" bg="#fff" padding="12px" mt="24px" borderRadius="18px" boxShadow="rgb(0 0 0 / 2%) 0px 3.5px 5.5px">
        <Thead >
          <Tr py="20px">
            {list.length &&
              Object.keys(list[0]).map((thead, index) => {
                return (
                  <Th key={index} fontFamily="Plus Jakarta Display" fontSize="18px" py="24px">
                    {thead}
                  </Th>
                );
              })}
          </Tr>
        </Thead>
        <Tbody >
          {list.map((row) => {
            return (
              <Tr borderRadius="20px">
                {list.length &&
                  Object.values(row).map((td, index) => {
                    return (
                      <>
                        {index === 0 ? (
                          <Td display="flex" align="center" py="24px" fontWeight="500" borderBottom="none">
                            <label className="container">
                              <input
                                type="checkbox"
                                className="checkbox"
                                value={td}
                                onChange={(e) => handleToggleCheckbox(e)}
                              />
                              <span className="checkmark"></span>
                            </label>
                            {td}
                          </Td>
                        ) : (
                          <Td key={index} fontWeight="500" borderBottom="none">{td}</Td>
                        )}
                      </>
                    );
                  })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Button
        variant="solid"
        colorScheme="blue"
        w="fit-content"
        mx="auto"
        mt="24px"
        onClick={deleteSelectedElements}
      >
        Șterge elementele selectate!
      </Button>
    </Container>
  );
};

export default Tabel;
