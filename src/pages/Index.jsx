import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Box } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task }]);
    setTask("");
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setTask(taskToEdit.text);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  const handleUpdateTask = () => {
    if (task.trim() === "") return;
    setTasks(tasks.map((t) => (t.id === currentTaskId ? { ...t, text: task } : t)));
    setTask("");
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={isEditing ? handleUpdateTask : handleAddTask}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </HStack>
        <VStack width="100%" spacing={2}>
          {tasks.map((t) => (
            <HStack key={t.id} width="100%" justifyContent="space-between">
              <Text>{t.text}</Text>
              <Box>
                <IconButton
                  aria-label="Edit"
                  icon={<FaEdit />}
                  size="sm"
                  onClick={() => handleEditTask(t.id)}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<FaTrash />}
                  size="sm"
                  onClick={() => handleDeleteTask(t.id)}
                />
              </Box>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;