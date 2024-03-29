import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdowm/cart-dropdrown.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector"; 

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utills';

import {
    NavigationContainer, 
    NavLink, 
    NavLinks, 
    LogoContainer
} from './navigation.styles';

const Navigation = () => {
    const currentUser  = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    
    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>
                                 SIGN OUT
                            </NavLink>)
                            : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />  {/* component that represents the page home*/} 
        </>
    )
  }

export default Navigation