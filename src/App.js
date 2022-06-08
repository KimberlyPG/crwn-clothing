import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route} from "react-router-dom";
import { 
    onAuthStateChangedListener,
    createUserDocumentFromAuth 
} from "./utils/firebase/firebase.utills";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import { GlobalStyle } from "./global.styles";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user)); //if user sign in we store the object, if user sign out we store null
    });
    
    return unsubcribe
  }, []);

  return (
    <>
    <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} /> 
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />}/>
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );  
};

export default App;
