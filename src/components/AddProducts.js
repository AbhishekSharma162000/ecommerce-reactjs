import React, { useState } from 'react';
import {storage, db} from '../config/Config';

const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if(selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type png or jpg');
        }
    }
    

    const addProduct = (e) => {
        e.preventDefault();
        console.log(productName, productPrice, productDesc, productImg);
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_change', snapshot => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            console.log(progress);
        },err=>{
            setError(err.message);
        },()=>{
            storage.ref('product-images').child(productImg.name).getDownloadURL().then(url=>{
                db.collection('Products').add({
                    ProductName: productName,
                    ProductPrice: Number(productPrice),
                    ProductDesc: productDesc,
                    ProductImg: url
                }).then(()=>{
                    setProductName('');
                    setProductPrice(0);
                    setProductDesc('');
                    setProductImg('');
                    setError('');
                    document.getElementById('file').value = '';
                }).catch(err=>setError(err.message));
            })
        })
    }

    return (
        <div className='container'>
        <br/>
        <h2>ADD PRODUCTS</h2>
        <br/>
        <form autoComplete='off' className='form-group' onSubmit={addProduct}>
            <label htmlFor='product-name'>Product Name</label>
            <input type='text' className='form-control' required 
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
            />
            <br/>
            <label htmlFor='product-price'>Product Price</label>
            <input type='number' className='form-control' required 
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
            />
            <br/>
            <label htmlFor='product-desc'>Product Description</label>
            <textarea className='form-control' required 
                onChange={(e) => setProductDesc(e.target.value)}
                value={productDesc}
             />
            <br/>
            <label htmlFor='product-img'>Product Image</label>
            <input className='form-control' type='file' onChange={productImgHandler} id='file'/>
            <br/>
            <div className="d-flex justify-content-center">
                <button type='submit' className="btn btn-success">ADD</button>
            </div>
        </form>
        {
            error && <span>{error}</span>
        }
        </div>
    );
}

export default AddProducts;
