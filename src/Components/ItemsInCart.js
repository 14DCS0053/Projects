import React,{Component} from 'react';
import './Css/ItemsInCart.css';
import {connect} from 'react-redux';
const getTotalAmount=(items)=>{
   return(
       items.reduce((prev,next)=>next.price+prev,0)
   );
}
/*const getTotalAmount=(items,item)=>{
    var total=0;
    items.map((x)=>{
        if(x.id===item.id)
        total=total+x.price;
    })
}*/
const itemWithQuantity=(items)=>{
    var found=false;
    return(
        items.reduce((prev,next)=>{
            for(var i=0;i<prev.length;i++){
              if(next.id===prev[i].id){
                  found=true;
                  break;
              }
            }
            if(found)
            prev[i].quantity++;
            else
            prev.push({...next,quantity:1});
            found=false;
            return prev;
          },[])
    );
}

class ItemsInCart extends Component{
   render(){
       if(this.props.cart.length>0){
       return(
         <div className="cart-container">
            <h1>Items In Cart Are:</h1><button className="clear-cart" onClick={this.props.clearCart}>Clear Cart</button>
            <form className='serch-form'>
             
            </form>
            { 
                 itemWithQuantity(this.props.cart).map((item,index)=>(
                    <div key={index} className="item-box-cart">
                        <img src={item.image}alt="image not found"/>
                        <div className="cart-detail-box">
                        <h1>Model:{item.name}</h1>
                        <h2>Brand:{item.brand}</h2>
                        <h3>Price:{item.price}</h3>
                        <h4 className="quantity">{item.quantity}</h4>
                        <span>{item.quantity>1&& 'last'}Added On{item.detail}</span>
                        <button onClick={()=>this.props.removeFromCart(item)}>Remove from Cart</button>
                        <div>Total:{item.price*item.quantity}</div>
                        </div>
                    </div>
                ))
            }
            <div className='total-amount'>Total Amount:{getTotalAmount(this.props.cart)}</div>
         </div>
       );
    }
    else return(
        <h1>No items In Cart</h1>
    );
   }
}

const mapStateTopProps=(state)=>{
    return{
        cart:state.cart
    };
}
const mapDispatchToProps=(Dispatch)=>{
    return{
        removeFromCart:(item)=>Dispatch({type:"REMOVE FROM CART",payload:item}),
        removeACopy:(item)=>Dispatch({type:"RemoveACopy",payload:item}),
        clearCart:()=>Dispatch({type:"ClearCart"})
    };
}

export default connect(mapStateTopProps,mapDispatchToProps)(ItemsInCart);