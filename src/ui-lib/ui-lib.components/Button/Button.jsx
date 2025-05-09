import {Button as ChakraButton, Text} from '@chakra-ui/react';
import {motion} from 'framer-motion';

export const Button = ({variation, children, boxStyle, ...rest}) => {
  switch (variation) {
    case 'primary':
      return (
        <ChakraButton
          bg="custom_color.color"
          w={`100%`}
          p={`20px 27px`}
          h={`max-content`}
          fontSize={'16px'}
          fontWeight="400"
          border={'1px solid'}
          borderColor="custom_color.color"
          color="custom_color.contrast"
          transition="ease-in-out 0.3s"
          _hover={{opacity: rest.isDisabled || rest.isLoading ? 'auto' : '1'}}
          _active={{opacity: rest.isDisabled || rest.isLoading ? 'auto' : '1'}}
          _focus={{opacity: rest.isDisabled || rest.isLoading ? 'auto' : '1'}}
          borderRadius={`56.25px`}
          letterSpacing={'0.16px'}
          lineHeight={`140%`}
          as={motion.button}
          whileTap={{scale: rest.isDisabled || rest.isLoading ? 1 : 0.9}}
          whileHover={{scale: rest.isDisabled || rest.isLoading ? 1 : 1.04}}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'secondary':
      return (
        <ChakraButton
          w={`100%`}
          p={`20px 27px`}
          h={`max-content`}
          fontSize={'16px'}
          fontWeight="400"
          border={'1px solid'}
          color="custom_color.color_pop"
          bg={`transparent`}
          transition="ease-in-out 0.3s"
          _hover={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          borderRadius={`56.25px`}
          letterSpacing={'0.16px'}
          lineHeight={`140%`}
          as={motion.button}
          whileTap={{scale: rest.isDisabled ? 1 : 0.9}}
          whileHover={{scale: rest.isDisabled ? 1 : 1.04}}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'tertiary':
      return (
        <ChakraButton
          w={`100%`}
          p={`20px 27px`}
          h={`max-content`}
          fontSize={'16px'}
          fontWeight="400"
          border={'1px solid'}
          color="text"
          bg={`transparent`}
          borderColor={`matador_border_color.100`}
          transition="ease-in-out 0.3s"
          _hover={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          borderRadius={`56.25px`}
          letterSpacing={'0.16px'}
          lineHeight={`140%`}
          as={motion.button}
          whileTap={{scale: rest.isDisabled ? 1 : 0.9}}
          whileHover={{scale: rest.isDisabled ? 1 : 1.04}}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    default:
      return (
        <ChakraButton
          borderRadius={0}
          fontWeight={500}
          as={motion.button}
          whileTap={{scale: rest.isDisabled ? 1 : 0.9}}
          whileHover={{scale: rest.isDisabled ? 1 : 1.04}}
          _hover={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
  }
};
