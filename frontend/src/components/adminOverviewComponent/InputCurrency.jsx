import { NativeSelect, TextInput } from '@mantine/core';

const data = [
  { value: 'egp', label: 'πͺπ¬ EGP' },
  { value: 'eur', label: 'πͺπΊ EUR' },
  { value: 'usd', label: 'πΊπΈ USD' },
  { value: 'cad', label: 'π¨π¦ CAD' },
  { value: 'gbp', label: 'π¬π§ GBP' },
  { value: 'aud', label: 'π¦πΊ AUD' },
];

export default function InputCurrency({ dataInput, toParent, toParentTwo, currency }) {
  const select = (
    <NativeSelect
      data={data}
      value={currency}
      onChange={(event) => toParentTwo(event.currentTarget.value)}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );

  return (
    <div style={{ width: '100%' }}>
      <TextInput
        type="number"
        placeholder="1000"
        label="Product Price"
        value={dataInput.value}
        onChange={(event) => toParent(event.currentTarget.value)}
        rightSection={select}
        rightSectionWidth={92}
      />
    </div>
  );
}
