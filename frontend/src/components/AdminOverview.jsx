import { SimpleGrid, Container, Group, useMantineTheme } from '@mantine/core';
import PhotoImport from './adminOverviewComponent/PhotoImport';
import Form from './adminOverviewComponent/Form';


const importPhoto = (height) => <PhotoImport height={height} radius="md" />;
const BASE_HEIGHT = 360;
const getSubHeight = (children, spacing) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export default function AdminOverview() {
  const theme = useMantineTheme();
  return (
    <Container my="md">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
        {importPhoto(BASE_HEIGHT)}
        <Group direction="column" className="overflow-auto d-inline-block">
		<Form/>
        </Group>
      </SimpleGrid>
    </Container>
  );
}
