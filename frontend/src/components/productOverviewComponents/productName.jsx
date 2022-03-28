import { Box, Text } from "@mantine/core";

export default function ProductName({ name }) {
  return (
    <Box
      className="border border-secondary rounded bg-white"
    >
      <Text className="fs-4 py-4 px-2 m-auto w-80" >{name}</Text>
    </Box >
  );
}
