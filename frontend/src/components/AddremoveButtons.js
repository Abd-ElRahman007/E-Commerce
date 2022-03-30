
import {Button} from '@mantine/core';

export default function AddremoveButtons(props) {
    return (
        <>
            <Button onClick={props.increaseCount}> + </Button>
                <span>{props.count}</span>
            <Button onClick={props.decreaseCount}>-</Button>
        </>
    )
}
