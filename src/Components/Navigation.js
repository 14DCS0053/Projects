import React from 'react';
import {NavLink} from 'react-router-dom';
const Navigation=()=>{
    return(
        <ul className='navigation'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/cart'>Cart</NavLink></li>
        </ul>
    );
}
export default Navigation;