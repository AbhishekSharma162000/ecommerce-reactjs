import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddProducts from './components/AddProducts';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import {ProductsContextProvider} from './global/ProductsContext';
import { auth, db } from './config/Config';
import {CartContextProvider} from './global/CartContext';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';

export default class App extends React.Component {

  state={
    user: null
  }

  componentDidMount(){
    auth.onAuthStateChanged(user=>{
      if(user) {
        db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot=>{
          this.setState({
            user: snapshot.data().Name
          })
        })
      }
      else {
        this.setState({
          user: null
        })
      }
    })
  }

render(){
  return (
    <ProductsContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home user={this.state.user}/>} />
          <Route path='/addproducts' element={<AddProducts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cartproducts' element={<Cart user={this.state.user} />} />
          <Route path='/productdetail/:id' element={<ProductDetail  />} />
        </Routes>
      </BrowserRouter>
      </CartContextProvider>
    </ProductsContextProvider>
  );
}
}


