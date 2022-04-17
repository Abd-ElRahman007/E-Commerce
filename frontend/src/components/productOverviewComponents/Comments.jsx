import { createStyles, Text, Avatar, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

export default function Comments({ postedAt, body, author }) {
  const { classes } = useStyles();
  return (
    <div>
      <Group>
        <Avatar radius="xl" />
        <div>
          <Text size="sm">{author}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {body}
      </Text>
    </div>
  );
}