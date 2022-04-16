import { Accordion } from '@mantine/core';

export default function ProductDescription({ description, label }) {
  return (
    <Accordion style={{marginTop:'20px'}}>
      <Accordion.Item label={label}>
        {description}
      </Accordion.Item>
    </Accordion>
  )
}
