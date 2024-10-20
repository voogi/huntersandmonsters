'use client';

import { useState } from 'react';
import { Input, Button, Textarea } from '@nextui-org/react';

export default function AddCardPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [health, setHealth] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cardData = {
      name,
      description,
      attack: Number(attack),
      defense: Number(defense),
      health: Number(health),
    };
    }


  return (
    <div>
      <h1>Add New Card</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Card Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          label="Attack"
          value={attack}
          onChange={(e) => setAttack(e.target.value)}
          type="number"
          required
        />
        <Input
          label="Defense"
          value={defense}
          onChange={(e) => setDefense(e.target.value)}
          type="number"
          required
        />
        <Input
          label="Health"
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          type="number"
          required
        />
        <Button type="submit">Add Card</Button>
      </form>
    </div>
  );
}
