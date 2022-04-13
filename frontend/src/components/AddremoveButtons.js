
import { ActionIcon } from '@mantine/core';
import { Plus, Minus } from 'tabler-icons-react';

export default function AddremoveButtons(props) {
    return (
        <>
            <ActionIcon
                size={28}
                variant="transparent"
                onClick={props.increaseQuantity}
                onMouseDown={(e) => e.preventDefault()}
            >
                <Plus size={16} />
            </ActionIcon>
            <span>{props.quantity}</span>
            <ActionIcon
                size={28}
                variant="transparent"
                onClick={props.decreaseQuantity}
                onMouseDown={(e) => e.preventDefault()}
            >
                <Minus size={16} />
            </ActionIcon>
        </>
    )
}
