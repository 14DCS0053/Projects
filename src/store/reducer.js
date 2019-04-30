const initialState={
    cart:[]
}
const myReducer=(state=initialState,action)=>{
    console.log('in reducer');
    const newState={...state};
    if(action.type==="AddToCart"){
        console.log('adding from reducer');
        let date=new Date();
        let detail=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+"at" +date.getHours()+":"+date.getMinutes();
        action.payload.detail=detail;
        newState.cart=[...newState.cart,action.payload];
        return newState;
    }
    else if(action.type==="REMOVE FROM CART"){  
         /*  const apiCall=await fetch('https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=ab84330fe50d10681c4797e9cb11cc33&q=chicken%20breast&page=2');  
          const apiData= await apiCall.json();
          console.log(apiData); */
          newState.cart=newState.cart.filter((item)=>item.id!==action.payload.id);
            return newState;
    }
    else if(action.type==="RemoveACopy"){
        var i;
        for(i=0;i<newState.cart.length;i++){
            if(newState.cart[i].id===action.payload.id)
                break;
        }
        newState.cart=newState.cart.filter((item,index)=>index!==i);
        return newState;
    }
    else if(action.type==="ClearCart"){
        newState.cart=[];
        return newState
    }
    else return newState;
}
export default myReducer;