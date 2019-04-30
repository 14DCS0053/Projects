export const addUpAsync=value=>{
    console.log('addUpAsyc');
return{type:"AddToCart",payload:value};
};
export const addUp=(val)=>{
    console.log('actions');
  return dispatch=>{
      fetch('https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=ab84330fe50d10681c4797e9cb11cc33&q=chicken%20breast&page=2')
      .then(res=>res.json())
      .then(data=>{
          console.log(data);
          dispatch(addUpAsync(val));
      })
  }
 /*  return dispatch=>{
     return setTimeout(()=>{
        dispatch(addUpAsync(val));
      },5000)
  } */
};