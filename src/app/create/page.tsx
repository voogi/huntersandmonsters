'use client';

import { useState } from 'react';
import { Input, Button, Textarea } from '@nextui-org/react';
import { saveCard } from '@/app/create/actions';

export default function AddCardPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [attack, setAttack] = useState('');
  const [health, setHealth] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cardData = {
      name,
      description,
      attack: Number(attack),
      health: Number(health),
      image,
    };

    saveCard(cardData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={'flex flex-col items-center gap-4'}>
        <Input label="Card Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Card image" value={image} onChange={(e) => setImage(e.target.value)} required />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <Input label="Attack" value={attack} onChange={(e) => setAttack(e.target.value)} type="number" required />
        <Input label="Health" value={health} onChange={(e) => setHealth(e.target.value)} type="number" required />
        <Button type="submit">Add Card</Button>
      </form>
    </div>
  );
}
