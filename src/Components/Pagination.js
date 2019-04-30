import React from 'react';
const Pagination=(props)=>{
    console.log('pagination');
    return(<div className='pagination'>
        {[...Array(props.page_length)].map((value,index)=>{
            index=index+props.starting_page;
           return<Button key={index} text={index} current_page={props.current_page} change_pagination={()=>props.change_pagination((index-1)*props.itration-props.start_index)}/>
        })}
    </div>);
}
export default Pagination;

const Button=(props)=>{
  return<button className={props.current_page===props.text? "active":''} onClick={props.change_pagination}>{props.text}</button>
}
