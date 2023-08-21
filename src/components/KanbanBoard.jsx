import React, { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Flex, Select } from '@chakra-ui/react';
import KanbanLane from './KanbanLane';
import AddCard from './AddCard';
import { fetchTickets } from '../api/api';

const STORAGE_KEY = 'kanbanViewState';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedState) {
      setGrouping(savedState.grouping);
      setSorting(savedState.sorting);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTickets();
      setTickets(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ grouping, sorting }));
  }, [grouping, sorting]);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  const handleAddCard = (title) => {
    const newCard = {
      title,
      // Set other card properties based on your API response
    };
    setTickets([...tickets, newCard]);
  };

  return (
    <DndContext>
      <Flex flexDirection="column">
        <Select value={grouping} onChange={handleGroupingChange}>
          <option value="status">By Status</option>
          <option value="user">By User</option>
          <option value="priority">By Priority</option>
        </Select>
        <Select value={sorting} onChange={handleSortingChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </Select>
        <AddCard addCard={handleAddCard} />
        <Flex justifyContent="center" p={4}>
          <KanbanLane title="ToDo" cards={tickets} grouping={grouping} sorting={sorting} />
          {/* Add other KanbanLane components for different lanes */}
        </Flex>
      </Flex>
    </DndContext>
  );
};

export default KanbanBoard;
