import { Box, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimateImagePresence = ({
    sourceUrl,
    refetch,
    videoUrl,
    layoutId,
    onClick,
    ...rest
  }) => {
    const variants = {
      enter: direction => {
        return {
          x: direction > 0 ? 1000 : -1000,
          opacity: 1,
        };
      },
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      exit: direction => {
        return {
          zIndex: 0,
          x: direction < 0 ? 1000 : -1000,
          opacity: 0,
        };
      },
    };
  
    return (
      <AnimatePresence>
        <motion.div
          onClick={onClick}
          variants={variants}
          transition={{
            x: {type: 'spring', stiffness: 300, damping: 30},
            opacity: 1,
            duration: 1.2,
          }}
          drag="x"
          dragConstraints={{left: 0, right: 0}}
          dragElastic={1}
          layoutId={layoutId}
        >
          <Box position="relative">
            <Image
              alt=""
              h="380px"
              w="465px"
              maxW="465px"
              src={sourceUrl}
              objectFit={'cover'}
              lazy={true}
              {...rest}
            />
          </Box>
        </motion.div>
      </AnimatePresence>
    );
  };