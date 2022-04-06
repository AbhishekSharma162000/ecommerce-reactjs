import React, {useContext} from 'react';
import ProductsContext from '../global/ProductsContext';
import {CartContext} from '../global/CartContext';
import { Link} from 'react-router-dom';

const Products = () => {
    const {products} = useContext(ProductsContext);
    // console.log(products);

    // const data = useContext(CartContext);
    // console.log(data);

    const {dispatch} = useContext(CartContext);

    return (
        <>
        {products.length !== 0 && <h1>Products</h1>}
        <div className='products-container'>
            {products.length === 0 && <div className="spinner-border text-primary mt-5" role="status">
  <span className="sr-only"></span>
</div>}

            {products.map(product => (
                <div className='product-card' key={product.ProductID}>
                    
                    <div className='product-img'>
                    <img src={product.ProductImg} alt="not found" />
                    </div>
                    <div className='product-name'>
                        {product.ProductName}
                    </div>
                    
                    <div className='product-price'>
                        ${product.ProductPrice}.00
                    </div>
                   
                    <button className='addcart-btn' onClick={()=>{dispatch({type: 'ADD_TO_CART', id: product.ProductID, product})}}>ADD TO CART</button>
                    <Link to={'./productdetail/' + product.ProductID} className='pdetail-btn btn' >VIEW DETAILS</Link>
                </div>
            ))}
        </div>
    </> 
    );
}

export default Products;
