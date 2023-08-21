import React, { useState } from 'react';
import { Button, Input, Flex } from '@chakra-ui/react';

const AddCard = ({ addCard }) => {
  const [title, setTitle] = useState('');

  const handleAddCard = () => {
    if (title.trim() !== '') {
      addCard(title);
      setTitle('');
    }
  };

  return (
    <Flex justifyContent="center" p={4}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter card title"
        mr={2}
      />
      <Button onClick={handleAddCard}>Add Card</Button>
    </Flex>
  );
};

export default AddCard;
