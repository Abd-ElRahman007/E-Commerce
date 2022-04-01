import { useRef } from 'react';
import { Text, Group, Button, createStyles, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CloudUpload } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 20,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}));

function getActiveColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
      ? theme.colors.red[6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.black;
}

export default function PhotoImport() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const openRef = useRef();

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={() => { }}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={10 * 1024 **2}
      >
        {(status) => (
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <CloudUpload size={50} color={getActiveColor(status, theme)} />
            </Group>
            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
              sx={{ color: getActiveColor(status, theme) }}
            >
              {status.accepted
                ? 'Drop files here'
                : status.rejected
                  ? 'JPG file less than 10mb'
                  : 'Upload Photo'}
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only <i>.jpg</i> files that
              are less than 10mb in size.
            </Text>
          </div>
        )}
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current()}>
        Select files
      </Button>
    </div>
  );
}
