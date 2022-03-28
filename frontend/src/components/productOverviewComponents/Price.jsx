import { Box, Text, Paper } from "@mantine/core";

export default function Price({ price, currency }) {
  return (
    <Paper withBorder radius="md">
    <Box className="bg-white text-center">
      <Text className="fs-4 py-4 px-1">{`${price} ${currency}`}</Text>
    </Box>
    </Paper>
  );
}
