import { useRef, useState } from 'react';
import { Text, Group, Button, createStyles, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CloudUpload } from 'tabler-icons-react';
import Image from '../productOverviewComponents/Image';

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
    position: 'relative',
    width: 250,
	marginBottom:'10px',
    left: 'calc(50% - 125px)',
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
  const [paths, setPath] = useState();

  function imgPath(files) {
    const paths = files.map((file) => URL.createObjectURL(file))
    setPath(paths)
  }
  function img(paths) {
    if (paths) {
	return paths.map((img) => <Image cols='col-6' dim={{height:'100px',margin:'2px',width:'160px'}} image={img} title='' author='' key={img}/>)
    }
  }

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => imgPath(files)}
        onReject={(files) => console.log('rejected files', files)}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={2 * 1024 ** 2}
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
                  ? 'JPG file less than 2mb'
                  : 'Upload Photo'}
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only <i>.jpg</i> files that
              are less than 2mb in size.
            </Text>
          </div>
        )}
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current()}>
        Select files
      </Button>
	  <div className='row justify-content-evenly overflow-auto h-25'>
	  {img(paths)}	  
	  </div>
    </div>
  );
}
