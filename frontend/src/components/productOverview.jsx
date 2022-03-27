import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme } from '@mantine/core';
import ProductName from './productOverviewComponents/productName';
import { ImageCard } from './productOverviewComponents/productPhoto';
import ProductPrice from './productOverviewComponents/productPrice';

const PRIMARY_COL_HEIGHT = 300;

export default function ProductOverview() {
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

    return (
        <Container my="md">
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <ImageCard image="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    title="Journey to Swiss Alps"
                    author="Robert Gluesticker" height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
                <Grid gutter="md">
                    <Grid.Col>
                        <ProductName name="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <ProductPrice price='20' currency='EG' height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
}
