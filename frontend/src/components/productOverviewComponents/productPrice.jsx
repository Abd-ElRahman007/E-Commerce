import { Box, Text } from "@mantine/core";

export default function ProductPrice({ price, currency }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      py={4}
      px={6}
      borderRadius={4}
    >
      <Text fontSize="lg">{`${price} ${currency}`}</Text>
    </Box>
  );
}

