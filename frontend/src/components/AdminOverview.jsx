import { SimpleGrid, Container, Group, useMantineTheme } from '@mantine/core';
import InputCurrency from './adminOverviewComponent/InputCurrency';
import InputDropdown from './adminOverviewComponent/InputDropdown';
import InputStoke from './adminOverviewComponent/InputStoke';
import InputText from './adminOverviewComponent/InputText';
import InputTextArea from './adminOverviewComponent/InputTextArea';
import PhotoImport from './adminOverviewComponent/PhotoImport';


const importPhoto = (height) => <PhotoImport height={height} radius="md" />;
const inputText = (height, data) => <InputText data={data} height={height} radius="md" />;
const inputTextArea = (height, data) => <InputTextArea data={data} height={height} radius="md" />;
const inputDropdown = (height, data) => <InputDropdown data={data} height={height} radius="md" />;
const inputCurrency = (height) => <InputCurrency height={height} radius="md" />;
const inputStoke=(height,min,max)=><InputStoke height={height} min={min} max={max} radius="md" />;
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
          {inputText(getSubHeight(4, theme.spacing.md),{label: 'Product Name', placeholder: 'Product Name'})}
          {inputText(getSubHeight(4, theme.spacing.md),{label: 'Product Model', placeholder: 'Product Model'})}
          {inputText(getSubHeight(4, theme.spacing.md),{label: 'Product Code', placeholder: 'Product Code'})}
          {inputDropdown(getSubHeight(4, theme.spacing.md),{label: 'Brand', placeholder: 'brand', data: ['brand1','brand2','brand3','brand4','brand5']})}
          {inputDropdown(getSubHeight(4, theme.spacing.md), { label: 'Category', placeholder: 'category', data: ['category1', 'category2', 'category3', 'category4', 'category5'] })}
          {inputCurrency(getSubHeight(4, theme.spacing.md))}
          {inputStoke(getSubHeight(4, theme.spacing.md),0)}
          {inputTextArea(getSubHeight(4, theme.spacing.md), { label: 'Description', placeholder: 'Description' })}
        </Group>
      </SimpleGrid>
    </Container>
  );
}
