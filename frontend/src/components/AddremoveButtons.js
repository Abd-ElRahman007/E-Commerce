
import {Button} from '@mantine/core';

export default function AddremoveButtons(props) {
    return (
        <>
            <Button onClick={props.increaseQuantity}> + </Button>
                <span>{props.quantity}</span>
            <Button onClick={props.decreaseQuantity}>-</Button>

        </>
    )
}
