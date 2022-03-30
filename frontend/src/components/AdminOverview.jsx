import { SimpleGrid, Skeleton, Container, Group, useMantineTheme } from '@mantine/core';
import PhotoImport from './adminOverviewComponent/PhotoImport';

const importPhoto = (height) => <PhotoImport height={height} radius="md" />;
const inputs = (height) => <Skeleton height={height} radius="md" animate={false} />;
const BASE_HEIGHT = 360;
const getSubHeight = (children, spacing) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export default function AdminOverview() {
  const theme = useMantineTheme();
  return (
    <Container my="md">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
        {importPhoto(BASE_HEIGHT)}
        <Group direction="column">
          {inputs(getSubHeight(3, theme.spacing.md))}
          {inputs(getSubHeight(3, theme.spacing.md))}
          {inputs(getSubHeight(3, theme.spacing.md))}
        </Group>
      </SimpleGrid>
    </Container>
  );
}
