import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import data from '../data';
import Product from './Product';
import Pagination from './Pagination';
import './Css/ProductList.css';
import Brand from '../Components/Brand';
import * as Actions from '../actions';

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'/* ,
      width: '100%',
      maxWidth: '400px',
      height: 'auto', */
   }
};
class ProductList extends Component {
   state = {
      full_data: [],
      display_data: [],
      itration: 5,
      start_index: 0,
      starting_page: 0,
      last_page: 0,
      total_page: 0,
      active_brand: "All",
      modalOpen: false,
      modalData: {
         name: "",
         image: ""
      }
   }
   componentDidMount() {
      Modal.setAppElement('body');
   }
   componentWillMount() {
      const full_data = [...data.products];
      var display_data;
      //const full_data=data.sort((a,b)=>a.first_name<b.first_name?-1:b.first_name<a.first_name?1:0);
      if (full_data.length > this.state.itration)
         display_data = full_data.slice(this.state.start_index, this.state.start_index + this.state.itration);
      else
         display_data = [...data.products];

      console.log(display_data);
      const total_page = this.getTotalPage(full_data, this.state.itration);
      const starting_page = 1;
      const last_page = total_page > 10 ? 10 : total_page;
      this.setState({
         full_data: full_data,
         display_data: display_data,
         total_page: total_page,
         starting_page: starting_page,
         last_page: last_page
      })
   }
   changeBrand = val => {
      var display_data, full_data, total_page, last_page, active_brand;
      if (val === 'All') {
         full_data = data.products;
         active_brand = 'All'
      }
      else {
         full_data = data.products.filter(item => item.brand.toUpperCase() === val.toUpperCase());
         active_brand = val;
      }
      total_page = this.getTotalPage(full_data, this.state.itration);
      last_page = total_page > 10 ? 10 : total_page;
      if (full_data.length >= this.state.itration)
         display_data = full_data.slice(0, this.state.itration - 1);
      else
         display_data = [...full_data];

      this.setState({
         start_index: 0,
         full_data: full_data,
         display_data: display_data,
         starting_page: 1,
         last_page: last_page,
         total_page: this.getTotalPage(full_data, this.state.itration),
         active_brand: active_brand
      })
   }
   OpenModal = (data) => {
      console.log('ToggleModal');
      this.setState(
         {
            modalOpen: true,
            modalData: {
               name: data.name,
               image: data.image
            }
         }
      )
   }
   getTotalPage = (total_item, itemInOnePage) => {
      return (parseInt(total_item.length / itemInOnePage) + (total_item.length % itemInOnePage > 0 ? 1 : 0));
   }
   changePageData = (a) => {
      if (a !== 0) {
         const { itration, last_page, start_index, full_data, starting_page } = this.state;
         const new_index = start_index + a;
         const checkForward = ((itration * last_page) - 1) - new_index < 0 ? true : false;
         const checkBackward = new_index - (starting_page - 1) * itration < 0 ? true : false;
         const display_data = full_data.slice(new_index, new_index + itration);
         this.setState({
            display_data: [...display_data],
            start_index: new_index,
            starting_page: checkForward ? starting_page + 1 : checkBackward ? starting_page - 1 : starting_page,
            last_page: checkForward ? last_page + 1 : checkBackward ? last_page - 1 : last_page
         });
      }
   }

   render() {
      const { itration, last_page, start_index, full_data, starting_page, display_data, total_page } = this.state;
      console.log(`starting page=${starting_page} and last is ${last_page} ${display_data}`);
      return (
         <div className='home-page'>
            <div className='product-listing'>
               <Brand
                  changeBrand={this.changeBrand}
                  active_brand={this.state.active_brand} />
               {this.state.display_data.map((item, index) => <Product
                  key={index} item={item}
                  addToCart={this.props.addToCart}
                  removeACopy={() => this.props.removeACopy(item)}
                  OpenModal={this.OpenModal}
               />)}
               <Modal isOpen={this.state.modalOpen} style={customStyles}>
                  <div className='my-modal'>
                     <h1>{this.state.modalData.name} is Added To Cart</h1>
                     <img src={this.state.modalData.image} />
                     <button onClick={() => this.setState({ modalOpen: false })}>Continue Shopping</button>
                  </div>
               </Modal>
            </div>
            <div className='next-previos'>
               {(start_index > 0 && display_data.length > 0) &&
                  <button className='prev' onClick={() => this.changePageData(-itration)}>
                     previous
               </button>
               }
               {(start_index < (total_page - 1) * itration && display_data.length > 0) &&
                  <button className='next' onClick={() => this.changePageData(itration)}>
                     next
               </button>
               }
            </div>
            {full_data.length > itration &&
               <Pagination
                  starting_page={starting_page}
                  last_page={last_page}
                  change_pagination={this.changePageData}
                  page_length={total_page > 10 ? 10 : total_page}
                  current_page={parseInt((start_index) / itration) + 1}
                  itration={itration}
                  start_index={start_index}
               />
            }
         </div>

      );
   }
}
const mapStateToProps = (state) => {
   return {
      cart: state.cart
   };

};
const mapDispatchToProps = (dispatch) => {
   return {
      addToCart: (item) => dispatch({ type: "AddToCart", payload: item }),
      removeACopy: (item) => dispatch({ type: "RemoveACopy", payload: item })
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);