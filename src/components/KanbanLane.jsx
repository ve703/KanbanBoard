// src/components/KanbanLane.js

import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import KanbanCard from './KanbanCard';

const KanbanLane = ({ title, cards, grouping, sorting }) => {
  // Grouping logic
  let groupedCards = [...cards];
  if (grouping === 'status') {
    groupedCards = cards.reduce((groups, card) => {
      const status = card.status;
      if (!groups[status]) groups[status] = [];
      groups[status].push(card);
      return groups;
    }, {});
  } else if (grouping === 'user') {
    groupedCards = cards.reduce((groups, card) => {
      const user = card.assignedTo;
      if (!groups[user]) groups[user] = [];
      groups[user].push(card);
      return groups;
    }, {});
  } else if (grouping === 'priority') {
    groupedCards = cards.reduce((groups, card) => {
      const priority = card.priority;
      if (!groups[priority]) groups[priority] = [];
      groups[priority].push(card);
      return groups;
    }, {});
  }

  // Sorting logic
  if (sorting === 'priority') {
    groupedCards = groupedCards.sort((a, b) => b.priority - a.priority);
  } else if (sorting === 'title') {
    groupedCards = groupedCards.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <Box p={4} border="1px solid gray" borderRadius="md">
      <Text fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Flex direction="column">
        {groupedCards.map((group, index) => (
          <Flex key={index} direction="column" mb={2}>
            <Text fontWeight="bold">{group}</Text>
            {group.map((card) => (
              <KanbanCard key={card.id} ticket={card} />
            ))}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default KanbanLane;
