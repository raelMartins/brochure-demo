'use client';

import {Center, HStack} from '@chakra-ui/react';
import {useState} from 'react';
import {FaStar} from 'react-icons/fa';

export const StarRating = ({rating = 0, setRating = () => {}}) => {
  return (
    <HStack gap={`4px`}>
      {Array(5)
        .fill('')
        .map((el, i) => (
          <Center
            fontSize={`30px`}
            key={i}
            color={rating >= i + 1 ? `#fa6400` : `#E5E5E5`}
            cursor={`pointer`}
            onClick={() => setRating(i + 1)}
          >
            <FaStar />
          </Center>
        ))}
    </HStack>
  );
};
