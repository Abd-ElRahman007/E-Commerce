import { Box, Text } from "@mantine/core";

export default function ProductName({ name }) {
  return (
    <Box
      className="d-flex justify-content-center align-items-center "
    >
      <Text className="fs-4" >{name}</Text>
    </Box >
  );
}
