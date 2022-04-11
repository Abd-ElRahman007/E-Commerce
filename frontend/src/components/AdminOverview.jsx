import {Container} from '@mantine/core';
import Form from './adminOverviewComponent/Form';


//const importPhoto = (height) => <PhotoImport height={height} radius="md" />;
const BASE_HEIGHT = 360;
export default function AdminOverview() {
  return (
    <Container my="md">     
		<Form/>
    </Container>
  );
}
