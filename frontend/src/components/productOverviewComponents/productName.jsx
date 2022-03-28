import { Box, Text, Paper } from "@mantine/core";

export default function ProductName({ name }) {
  return (
    <Paper withBorder radius="md">
      <Box className="bg-white">
        <Text className="fs-4 py-4 px-2 m-auto w-80" >{name}</Text>
      </Box >
    </Paper>
  );
}
