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

const Modify = () => {
  const { tabelaId } = useParams();

  const toast = useToast();
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [studentData, setStudentData] = useState({
    idStudent: 0,
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
    idDepartment: 0,
  });

  const [meetingData, setMeetingData] = useState({
    idStudent: 0,
    idDepartment: 0,
    date: "",
    nrOfStudents: 2,
    idMeeting: 0,
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/students`).then((res) =>
      setStudents(res.data)
    );
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:3001/meetings`).then((res) =>
      setMeetings(res.data)
    );
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:3001/departments`).then((res) =>
      setDepartments(res.data)
    );
  }, []);

  const handleModifyStudents = () => {
    if (
      studentData.firstName === "" ||
      studentData.lastName === "" ||
      studentData.email === "" ||
      studentData.country === "" ||
      studentData.idStudent === 0
    ) {
      return toast({
        title: "Error.",
        description: "Please fill in the inputs above!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    Axios.put(
      `http://localhost:3001/update/${tabelaId}/${studentData.idStudent}`,
      {
        idStudent: studentData.idStudent,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        age: studentData.age,
        country: studentData.country,
        email: studentData.email,
        yearOfStudy: studentData.yearOfStudy,
      }
    );
    setStudentData({
      firstName: "",
      lastName: "",
      age: 18,
      email: "",
      country: "",
      yearOfStudy: 0,
      idStudent: 0,
    });
    return toast({
      title: "Modified.",
      description: "The student data has been modified!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleModifyDepartments = () => {
    if (departmentData.name === "" || departmentData.idDepartment === 0) {
      return toast({
        title: "Error.",
        description: "Please fill in the inputs above!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    Axios.put(
      `http://localhost:3001/update/${tabelaId}/${departmentData.idDepartment}`,
      {
        name: departmentData.name,
        idDepartment: departmentData.idDepartment,
        maxStudents: departmentData.maxStudents,
      }
    );
    setDepartmentData({
      name: "",
      maxStudents: 50,
      idDepartment: 0,
    });
    return toast({
      title: "Modified.",
      description: "The department data has been modified!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleModifyMeetings = () => {
    if (
      meetingData.idStudent === 0 ||
      meetingData.idDepartment === 0 ||
      meetingData.date === "" ||
      meetingData.idMeeting === 0
    ) {
      return toast({
        title: "Error.",
        description: "Please fill in the inputs above!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    Axios.put(
      `http://localhost:3001/update/${tabelaId}/${meetingData.idMeeting}`,
      {
        idStudent: meetingData.idStudent,
        idDepartment: meetingData.idDepartment,
        nrOfStudents: meetingData.nrOfStudents,
        date: meetingData.date,
        idMeeting: meetingData.idMeeting,
      }
    );
    setMeetingData({
      idStudent: 0,
      idDepartment: 0,
      date: "",
      nrOfStudents: 2,
      idMeeting: 0,
    });
    return toast({
      title: "Modified.",
      description: "The meeting data has been modified!",
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
          <FormControl gridColumn="1 / 3">
            <FormLabel>STUDENTS ID</FormLabel>
            <Select
              border="1px solid"
              borderColor="#333"
              _hover="none"
              className="select"
              placeholder="Alege ID Student..."
              onChange={(e) =>
                setStudentData({
                  ...studentData,
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
            <NumberInput
              defaultValue={18}
              min={18}
              max={99}
              value={studentData.age}
            >
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
            onClick={handleModifyStudents}
          >
            MODIFICĂ STUDENTU'!
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
          <FormControl gridColumn="1 / 3">
            <FormLabel>MEETINGS ID</FormLabel>
            <Select
              border="1px solid"
              borderColor="#333"
              _hover="none"
              placeholder="Alege ID ȘEDINȚA..."
              onChange={(e) =>
                setMeetingData({
                  ...meetingData,
                  idMeeting: Number(e.target.value.split(" ")[0]),
                })
              }
            >
              {meetings.map((meeting, index) => {
                return <option key={index}>{`${meeting.id_meeting}`}</option>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>ID Student</FormLabel>
            <Select
              border="1px solid"
              borderColor="#333"
              _hover="none"
              placeholder="Alege ID Student..."
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
              border="1px solid"
              borderColor="#333"
              _hover="none"
              placeholder="Alege ID Departament..."
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

            <NumberInput defaultValue={2} min={2} max={99} value={meetingData.nrOfStudents}>
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
            onClick={handleModifyMeetings}
          >
            MODIFICĂ ȘEDINȚA!
          </Button>
        </Grid>
      ) : (
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap="24px"
          p="2rem"
          borderRadius="20px"
           bg="#fff"
          boxShadow="rgb(0 0 0 / 2%) 0px 3.5px 5.5px"
        >
          <FormControl gridColumn="1 / 3">
            <FormLabel>ID DEPARTMENT</FormLabel>
            <Select
              border="1px solid"
              borderColor="#333"
              _hover="none"
              placeholder="Alege id departament..."
              onChange={(e) =>
                setDepartmentData({
                  ...departmentData,
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
                value={departmentData.maxStudents}
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
            onClick={handleModifyDepartments}
          >
            MODIFICĂ DEPARTAMENT!
          </Button>
        </Grid>
      )}
    </Container>
  );
};

export default Modify;
