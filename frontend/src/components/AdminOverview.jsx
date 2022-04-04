import { SimpleGrid, Container, Group } from '@mantine/core';
import PhotoImport from './adminOverviewComponent/PhotoImport';
import Form from './adminOverviewComponent/Form';


const importPhoto = (height) => <PhotoImport height={height} radius="md" />;
const BASE_HEIGHT = 360;
export default function AdminOverview() {
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
