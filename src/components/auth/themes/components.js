export const components = {
  Button: {
    variants: {
      "fill-primary": {
        fontWeight: "400",
        fontSize: { md: "16px", base: "10px" },
        borderRadius: "56.25px",
        maxH: "60px",
        py: "20.2px",
        px: { base: "18px", md: "27px" },
        fontFamily: "var(--font-roboto)",
        bg: "#FA6400",

        _focus: {
          opacity: "1",
          bg: "#E35B00",
        },
        _hover: {
          opacity: "1",
          bg: "#E35B00",
        },
        _active: {
          opacity: "1",
          bg: "#E35B00",
        },
      },
    },
  },
};
