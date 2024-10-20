import React from 'react';
import Image from 'next/image';
import { Resource } from '@prisma/client';

const PlayerResources = ({ resources }: { resources: Resource[] }) => {
  return (
    <div>
      {resources.map((resource) => {
        if (resource.type === 'SILVER_BULLET') {
          return (
            <div key={resource.id} className="flex flex-row gap-2">
              {[...Array(resource.quantity)].map((_, index) => (
                <Image
                  className={'rounded-md'}
                  key={index}
                  src={'/bullett.webp'}
                  alt="Silver Bullet"
                  width={40}
                  height={40}
                />
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PlayerResources;
