import React, { Component } from 'react';
import './Css/Brand.css';
class Brand extends Component {
    render() {
        return (
            <ul className='brand-container'>
                <li className={this.props.active_brand=='All'&& 'Active-brand'} onClick={this.props.changeBrand.bind(this, 'All')}>All</li>
                <li className={this.props.active_brand=='Hp'&& 'Active-brand'}  onClick={this.props.changeBrand.bind(this, 'Hp')}>Hp</li>
                <li className={this.props.active_brand=='Dell'&& 'Active-brand'} onClick={this.props.changeBrand.bind(this, 'Dell')}>Dell</li>
                <li className={this.props.active_brand=='Lenovo'&& 'Active-brand'} onClick={this.props.changeBrand.bind(this, 'Lenovo')}>Lenovo</li>
                <li className={this.props.active_brand=='Samsung'&& 'Active-brand'} onClick={this.props.changeBrand.bind(this, 'Samsung')}>Samsung</li>
                <li className={this.props.active_brand=='Sony'&& 'Active-brand'} onClick={this.props.changeBrand.bind(this, 'Sony')}>Sony</li>
            </ul>
        );
    }
}
 export default Brand;