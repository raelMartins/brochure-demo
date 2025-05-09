import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const ClosedEyeIcon = ({ isOpen, ...rest }) => {
  const openpathVariants = {
    visible: {
      opacity: isOpen ? 1 : 0,
      pathLength: isOpen ? 1 : 0,
      transition: {
        ease: "easeInOut",
        duration: "0.7",
      },
    },
  };
  const closepathVariants = {
    visible: {
      opacity: isOpen ? 0 : 1,
      pathLength: isOpen ? 0 : 1,
      transition: {
        ease: "easeInOut",
        duration: "0.7",
      },
    },
  };

  return (
    <Box w="28px" h="28px" {...rest}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 28 28"
        fill="none"
      >
        {/* {
        isOpen ?
         ( */}
        <motion.path
          variants={openpathVariants}
          animate="visible"
          d="M3.05662 14.8023C2.90341 14.5597 2.82681 14.4384 2.78392 14.2513C2.75171 14.1108 2.75171 13.8892 2.78392 13.7487C2.82681 13.5616 2.90341 13.4403 3.05662 13.1977C4.3227 11.1929 8.09131 6.125 13.8344 6.125C19.5776 6.125 23.3462 11.1929 24.6123 13.1977C24.7655 13.4403 24.8421 13.5616 24.885 13.7487C24.9172 13.8892 24.9172 14.1108 24.885 14.2513C24.8421 14.4384 24.7655 14.5597 24.6123 14.8023C23.3462 16.8071 19.5776 21.875 13.8344 21.875C8.09131 21.875 4.32271 16.8071 3.05662 14.8023Z"
          stroke="#737373"
          strokeWidth="1.4625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* ) : null} */}
        {/* {isOpen ? null : ( */}
        <motion.path
          variants={closepathVariants}
          animate="visible"
          d="M12.4198 5.94956C12.877 5.88196 13.3487 5.8457 13.8345 5.8457C19.5776 5.8457 23.3462 10.9136 24.6123 12.9184C24.7655 13.161 24.8421 13.2823 24.885 13.4695C24.9172 13.61 24.9172 13.8317 24.885 13.9722C24.842 14.1593 24.7649 14.2815 24.6106 14.5257C24.2732 15.0596 23.7589 15.8099 23.0775 16.6237M7.89885 7.77512C5.46651 9.42512 3.81524 11.7175 3.05773 12.9166C2.9038 13.1603 2.82684 13.2821 2.78394 13.4692C2.75172 13.6098 2.75171 13.8314 2.78391 13.972C2.82679 14.1591 2.90341 14.2804 3.05664 14.523C4.32272 16.5278 8.09132 21.5957 13.8345 21.5957C16.1502 21.5957 18.1449 20.7717 19.7839 19.6569M3.70945 3.5957L23.9595 23.8457M11.448 11.3342C10.8372 11.945 10.4595 12.7887 10.4595 13.7207C10.4595 15.5847 11.9705 17.0957 13.8345 17.0957C14.7664 17.0957 15.6102 16.7179 16.2209 16.1072"
          stroke="#737373"
          strokeWidth="1.4625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* )} */}
        {/* {isOpen ? ( */}
        <motion.path
          variants={openpathVariants}
          animate="visible"
          d="M13.8344 17.375C15.6984 17.375 17.2094 15.864 17.2094 14C17.2094 12.136 15.6984 10.625 13.8344 10.625C11.9705 10.625 10.4594 12.136 10.4594 14C10.4594 15.864 11.9705 17.375 13.8344 17.375Z"
          stroke="#737373"
          strokeWidth="1.4625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* ) : null} */}
      </motion.svg>
    </Box>
  );
};

export default ClosedEyeIcon;
