import { Box, Text } from "@mantine/core";

export default function ProductPrice({ price, currency }) {
  return (
    <Box className="bg-white border border-secondary rounded text-center">
      <Text className="fs-4 py-4 px-1">{`${price} ${currency}`}</Text>
    </Box>
  );
}
