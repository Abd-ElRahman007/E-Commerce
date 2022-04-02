import { createStyles, Select } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export default function InputDropdown({data}) {
  const { classes } = useStyles();
  return (
    <div>
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={data.data}
        placeholder={data.placeholder}
        label={data.label}
        classNames={classes}
        width="100%"
      />
    </div>
  )
}
