import { Accordion } from '@mantine/core';

export default function ProductDescription({ description, label }) {
  return (
    <Accordion>
      <Accordion.Item label={label}>
        {description}
      </Accordion.Item>
    </Accordion>
  )
}
