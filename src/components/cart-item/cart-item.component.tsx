import { FC } from 'react'
import { CartItemContainer, ItemDetails, Name } from './cart-item.styles'
import { CartItem as TCartItem } from '../../store/cart/cart.types'

type CartItemProps = {
    CartItem: TCartItem;
}

const CartItem: FC<CartItemProps> = ({CartItem}) => {
    const { name, imageUrl, price, quantity } = CartItem
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
                <Name>{name}</Name>
                <span>
                    {quantity} x ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem