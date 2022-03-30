
import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import AddremoveButtons from './AddremoveButtons';

export default function ProductThumb(props) {
    const theme = useMantineTheme();
    const [count, setCount] = useState(1)

    const increaseCount=()=>{
        const number =count+1
        setCount(number)

    }


    const decreaseCount=()=>{
        if (count <= 1)  
         return; 
         const number =count-1
         setCount(number)

    }


    return (
        <div style={{ width: 340, margin: 'auto' }}>
        <Card shadow="sm" p="lg">
          <Card.Section>
            <Image src={props.product.main_image}
                   alt="Product" 
                    radius={10}
                   
             />
          </Card.Section>
  
          <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <Text weight={500}>{props.product.name}</Text>
            <Badge color="pink" variant="light" size="xl" >
              {props.product.price}
            </Badge>
          </Group>
  
          {/* <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text> */}
             <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Button variant="light" color="blue"  style={{ marginTop: 14 }}>
            Add to Cart 
          </Button>
            <AddremoveButtons
                increaseCount={increaseCount}
                decreaseCount={decreaseCount}
                count={count}
                    />
          </Group>
        </Card>
      </div>
    )
}
