import { NativeSelect, TextInput } from '@mantine/core';

const data = [
  { value: 'egp', label: '🇪🇬 EGP' },
  { value: 'eur', label: '🇪🇺 EUR' },
  { value: 'usd', label: '🇺🇸 USD' },
  { value: 'cad', label: '🇨🇦 CAD' },
  { value: 'gbp', label: '🇬🇧 GBP' },
  { value: 'aud', label: '🇦🇺 AUD' },
];

export default function InputCurrency() {
  const select = (
    <NativeSelect
      data={data}
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
    <TextInput
      type="number"
      placeholder="1000"
      label="Product Price"
      rightSection={select}
      rightSectionWidth={92}
    />
  );
}
