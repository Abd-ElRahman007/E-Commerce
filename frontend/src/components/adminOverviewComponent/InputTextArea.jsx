import { Textarea } from '@mantine/core';

export default function InputTextArea({ data }) {
  return (
    <Textarea
      placeholder={data.placeholder}
      label={data.label}
      required
      autosize
      minRows={3}
      mt="md"
      style={{ width: '100%' }}
    />
  );
}
