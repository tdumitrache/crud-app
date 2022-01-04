import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Grid,
  Select,
  Button,
  useToast,
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const Add = () => {
  const toast = useToast();
  const { tabelaId } = useParams();
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    age: 18,
    email: "",
    country: "",
    yearOfStudy: 1,
  });

  const [departmentData, setDepartmentData] = useState({
    name: "",
    maxStudents: 50,
  });

  const [meetingData, setMeetingData] = useState({
    idStudent: 0,
    idDepartment: 0,
    date: "",
    nrOfStudents: 2,
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/students`).then((res) =>
      setStudents(res.data)
    );
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:3001/departments`).then((res) =>
      setDepartments(res.data)
    );
  }, []);

  const handleAddStudents = () => {
    if (
      studentData.firstName === "" ||
      studentData.lastName === "" ||
      studentData.email === "" ||
      studentData.country === ""
    ) {
      return toast({
        title: "Error.",
        description: "Please fill in the inputs above!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    Axios.post("http://localhost:3001/add/students", {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      age: studentData.age,
      country: studentData.country,
      email: studentData.email,
      yearOfStudy: studentData.yearOfStudy,
    });
    setStudentData({
      firstName: "",
      lastName: "",
      age: 18,
      email: "",
      country: "",
      yearOfStudy: 0,
    });
    return toast({
      title: "Success.",
      description: "Student has been added!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddDepartments = () => {
    if (departmentData.name === "") {
      return toast({
        title: "Error.",
        description: "Please fill in the inputs above!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    Axios.post("http://localhost:3001/add/departments", {
      name: departmentData.name,
      maxStudents: departmentData.maxStudents,
    });
    setDepartmentData({
      name: "",
      maxStudents: 50,
    });
    return toast({
      title: "Success.",
      description: "Department has been added!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddMeetings = () => {
    if (
      meetingData.idStudent === 0 ||
      meetingData.idDepartment === 0 ||
      meetingData.date === ""
    ) {
      return toast({
        title: "Error.",
        description: "Please fill in the inputs above!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    Axios.post("http://localhost:3001/add/meetings", {
      idStudent: meetingData.idStudent,
      idDepartment: meetingData.idDepartment,
      date: meetingData.date,
      nrOfStudents: meetingData.nrOfStudents,
    });
    setMeetingData({
      idStudent: 0,
      idDepartment: 0,
      date: "",
      nrOfStudents: 2,
    });
    return toast({
      title: "Success.",
      description: "Meeting has been added!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container
      maxW="1170px"
      mx="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      {tabelaId === "students" ? (
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap="24px"
          p="2rem"
          borderRadius="20px"
          bg="#fff"
          boxShadow="rgb(0 0 0 / 2%) 0px 3.5px 5.5px"

        >
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              border="1px solid"
              borderColor="#333"
              _hover="none"
              value={studentData.firstName}
              onChange={(e) =>
                setStudentData({ ...studentData, firstName: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              border="1px solid"
              borderColor="#333"
              _hover="none"
              value={studentData.lastName}
              onChange={(e) =>
                setStudentData({ ...studentData, lastName: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <NumberInput defaultValue={18} min={18} max={99} value={studentData.age}>
              <NumberInputField
                border="1px solid"
                borderColor="#333"
                _hover="none"
                
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    age: Number(e.target.value),
                  })
                }
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setStudentData({
                      ...studentData,
                      age: Number(studentData.age) + 1,
                    })
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setStudentData({
                      ...studentData,
                      age: Number(studentData.age) - 1,
                    })
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              border="1px solid"
              borderColor="#333"
              _hover="none"
              value={studentData.email}
              onChange={(e) =>
                setStudentData({ ...studentData, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              border="1px solid"
              borderColor="#333"
              _hover="none"
              value={studentData.country}
              onChange={(e) =>
                setStudentData({ ...studentData, country: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year of study</FormLabel>
            <Select
              placeholder="1"
              border="1px solid"
              borderColor="#333"
              _hover="none"
              value={studentData.yearOfStudy}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  yearOfStudy: Number(e.target.value),
                })
              }
            >
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Select>
          </FormControl>
          <Button
            variant="solid"
            colorScheme="blue"
            mx="auto"
            gridColumn="1 / 3"
            onClick={handleAddStudents}
          >
            ADAUGĂ STUDENTU'!
          </Button>
        </Grid>
      ) : tabelaId === "meetings" ? (
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap="24px"
          p="2rem"
          borderRadius="20px"
          bg="#fff"
          boxShadow="rgb(0 0 0 / 2%) 0px 3.5px 5.5px"
        >
          <FormControl>
            <FormLabel>ID Student</FormLabel>
            <Select
              placeholder="Adauga ID Student..."
              border="1px solid"
              borderColor="#333"
              _hover="none"
              onChange={(e) =>
                setMeetingData({
                  ...meetingData,
                  idStudent: Number(e.target.value.split(" ")[0]),
                })
              }
            >
              {students.map((student, index) => {
                return (
                  <option
                    key={index}
                  >{`${student.id_student} , ${student.first_name} , ${student.last_name}`}</option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>ID Departament</FormLabel>
            <Select
              placeholder="Adauga ID Departament..."
              border="1px solid"
              borderColor="#333"
              _hover="none"
              onChange={(e) =>
                setMeetingData({
                  ...meetingData,
                  idDepartment: Number(e.target.value.split(" ")[0]),
                })
              }
            >
              {departments.map((department, index) => {
                return (
                  <option
                    key={index}
                  >{`${department.id_department} , ${department.name}`}</option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Data ședinței</FormLabel>
            <Input
              type="text"
              placeholder="AA-LL-ZZ"
              border="1px solid"
              borderColor="#333"
              _hover="none"
              value={meetingData.date}
              onChange={(e) =>
                setMeetingData({ ...meetingData, date: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>NR. PARTICIPANȚI</FormLabel>

            <NumberInput
              defaultValue={2}
              min={2}
              max={99}
              value={meetingData.nrOfStudents}
            >
              <NumberInputField
                border="1px solid"
                borderColor="#333"
                _hover="none"
                onChange={(e) =>
                  setMeetingData({
                    ...meetingData,
                    nrOfStudents: Number(e.target.value),
                  })
                }
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setMeetingData({
                      ...meetingData,
                      nrOfStudents: Number(meetingData.nrOfStudents) + 1,
                    })
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setMeetingData({
                      ...meetingData,
                      nrOfStudents: Number(meetingData.nrOfStudents) - 1,
                    })
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button
            variant="solid"
            colorScheme="blue"
            mx="auto"
            gridColumn="1 / 3"
            onClick={handleAddMeetings}
          >
            ADAUGĂ ȘEDINȚA!
          </Button>
        </Grid>
      ) : (
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap="24px"
          p="2rem"
          borderRadius="20px"
          boxShadow="rgb(0 0 0 / 2%) 0px 3.5px 5.5px"
          bg="#fff"
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              border="1px solid"
              borderColor="#333"
              _hover="none"
              value={departmentData.name}
              onChange={(e) =>
                setDepartmentData({ ...departmentData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>NR. TOTAL STUDENȚI!</FormLabel>
            <NumberInput
              defaultValue={50}
              min={50}
              max={200}
              value={departmentData.maxStudents}
            >
              <NumberInputField
                border="1px solid"
                borderColor="#333"
                _hover="none"
                onChange={(e) =>
                  setDepartmentData({
                    ...departmentData,
                    maxStudents: Number(e.target.value),
                  })
                }
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setDepartmentData({
                      ...departmentData,
                      maxStudents: Number(departmentData.maxStudents) + 1,
                    })
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setDepartmentData({
                      ...departmentData,
                      maxStudents: Number(departmentData.maxStudents) - 1,
                    })
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button
            variant="solid"
            colorScheme="blue"
            mx="auto"
            gridColumn="1 / 3"
            onClick={handleAddDepartments}
          >
            ADAUGĂ DEPARTAMENT!
          </Button>
        </Grid>
      )}
    </Container>
  );
};

export default Add;
