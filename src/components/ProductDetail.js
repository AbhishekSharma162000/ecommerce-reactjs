import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/Config";

const ProductDetail = () => {
  const { id } = useParams();

  const [pDetail, setProductDetail] = useState('');

  db.collection('Products').doc(id).get().then((snapshot) => {
    // console.log(snapshot.data());
    const data = snapshot.data();
    setProductDetail(data);
  }).catch((e) => console.log(e));


  return (
    <>

      {pDetail.length !== 0 && <h1>Product Deatils</h1>}
      {pDetail.length === 0 && <div className="spinner-border text-primary mt-5" role="status">
        <span className="sr-only"></span>
      </div>}

      <div className="card mb-3 mt-5" style={{ maxWidth: '80%', border: 'none', marginLeft: '22px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={pDetail.ProductImg} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8" style={{ paddingLeft: '18px' }}>
            <div className="card-body">
              <h5 className="card-title">{pDetail.ProductName}</h5>
              <p className="card-text">{pDetail.ProductDesc}</p>
            </div>
          </div>
        </div>
      </div>



    </>
  );
}


export default ProductDetail;