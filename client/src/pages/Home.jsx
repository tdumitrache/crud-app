import React from "react";
import { Container, Stack, Button, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <Container
      maxW="1170px"
      mx="auto"
      p="16px"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid templateColumns="repeat(3, 1fr)" gap="30px" w="100%">
        <Stack diretion="column" spacing="24px" align="center">
            <Link to="/vizualizeaza/students">
                <Button variant="solid" bg="#81E6D9" _hover={{bg: "#B2F5EA"}} maxW="300px" py="20px">
                    VIZUALIZEAZĂ STUDENȚI!
                </Button>
            </Link>
            <Link to="/vizualizeaza/meetings">
              <Button variant="solid" bg="#81E6D9" _hover={{bg: "#B2F5EA"}} maxW="300px" py="20px">
                VIZUALIZEAZĂ ȘEDINȚE!
              </Button>
            </Link>
            <Link to="/vizualizeaza/departments">
              <Button variant="solid" bg="#81E6D9" _hover={{bg: "#B2F5EA"}} maxW="300px" py="20px">
                VIZUALIZEAZĂ DEPARTAMENTE!
              </Button>
            </Link>
        </Stack>
        <Stack diretion="column" spacing="24px" align="center">
          <Link to="/modifica/students">
            <Button variant="solid" bg="#63B3ED" _hover={{bg: "#3182CE"}} maxW="300px" py="20px">
              MODIFICĂ STUDENȚI!
            </Button>
          </Link>
          <Link to="/modifica/meetings">
          <Button variant="solid" bg="#63B3ED" _hover={{bg: "#3182CE"}} maxW="300px" py="20px">
            MODIFICĂ ȘEDINȚE!
          </Button>
          </Link>
          <Link to="/modifica/departments">
          <Button variant="solid" bg="#63B3ED" _hover={{bg: "#3182CE"}} maxW="300px" py="20px">
            MODIFICĂ DEPARTAMENTE!
          </Button>
          </Link>
        </Stack>
        <Stack diretion="column" spacing="24px" align="center">
          <Link to="/adauga/students">
            <Button variant="solid" bg="#B794F4" _hover={{bg: "#805AD5"}} maxW="300px" py="20px">
              ADAUGĂ STUDENȚI!
            </Button>
          </Link>
          <Link to="/adauga/meetings">
          <Button variant="solid" bg="#B794F4" _hover={{bg: "#805AD5"}} maxW="300px" py="20px">
            ADAUGĂ ȘEDINȚE!
          </Button>
          </Link>
          <Link to="/adauga/departments">
          <Button variant="solid" bg="#B794F4" _hover={{bg: "#805AD5"}} maxW="300px" py="20px">
            ADAUGĂ DEPARTAMENTE!
          </Button>
          </Link>
        </Stack>
      </Grid>
    </Container>
  );
};

export default Home;
