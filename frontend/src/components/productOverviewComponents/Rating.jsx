import { RingProgress, Text, SimpleGrid, Paper, Center, Group } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight } from 'tabler-icons-react';


const icons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
};

export default function Rating({ data }) {
  const Icon = icons[data.icon];
    return (
      <SimpleGrid cols={1} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      <Paper withBorder radius="md" p="xs" key={data.label}>
        <Group>
          <RingProgress className='m-auto'
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: data.progress, color: data.color }]}
            label={
              <Center>
                <Icon size={22} />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {data.label}
            </Text>
            <Text weight={700} size="xl">
              {data.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    </SimpleGrid>
    );
}
