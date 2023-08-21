import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

const KanbanCard = ({ ticket }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket.id,
    data: {
      ticket,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const priorityColors = {
    4: 'red', // Urgent
    3: 'orange', // High
    2: 'yellow', // Medium
    1: 'green', // Low
    0: 'gray', // No priority
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      p={2}
      border="1px solid gray"
      borderRadius="md"
      mb={2}
      backgroundColor="white"
      boxShadow="md"
      color={priorityColors[ticket.priority]}
    >
      <Text fontWeight="bold">{ticket.title}</Text>
      <Text>{`Priority: ${ticket.priority}`}</Text>
      <Text>{`Status: ${ticket.status}`}</Text>
      <Text>{`Assigned to: ${ticket.assignedTo}`}</Text>
    </Box>
  );
};

export default KanbanCard;