import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context";

import {signOutUser} from '../../utils/firebase/firebase.utills'

import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    // console.log(currentUser);

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>
                                 SIGN OUT
                            </span>)
                            : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                    )}
                </div>
            </div>
            <Outlet />  {/* component that represents the page hone*/} 
        </>
    )
  }

export default Navigation