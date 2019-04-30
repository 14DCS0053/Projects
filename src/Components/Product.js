import React, { Component } from 'react';
class Product extends Component{
   render(){
      const{ brand,price,name,image}=this.props.item;
         return(
             <div className="item-box">
                <div className='overlay-area'>
                <img src={image} alt="image not found"/>
                <div className='overlay'></div>
                </div>
                <div className='detail-box'>
                <h1>Model:{name}</h1>
                <h2>Brand:{brand}</h2>
                <h3>Price:{price}</h3>
                <button onClick={()=>{
                   this.props.addToCart(this.props.item);
                   this.props.OpenModal(this.props.item);
                }}>Add to Cart</button>
                </div>
             </div>
          );
        }

   }
export default Product;