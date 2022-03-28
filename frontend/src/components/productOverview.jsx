import { Container, Grid, SimpleGrid} from '@mantine/core';
import { Image, Name, Rating, Price, Description } from './productOverviewComponents';

export default function ProductOverview() {

    return (
        <Container my="md">
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Image image="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    title="Journey to Swiss Alps"
                    author="Robert Gluesticker" />
                <Grid gutter="md">
                    <Grid.Col>
                        <Name name="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Price price='20' currency='EG' />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Rating data={{
                            label: 'Rating',
                            stats: '4.5 / 10',
                            color: 'green',
                            icon: 'up',
                            progress: 45
                        }}/>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
            <Description description="adklfja;ddfjdkfj" label="Description"/>
        </Container>
    );
}
