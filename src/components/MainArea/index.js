import React, { Component } from 'react';

import Products from '../Products';
import Cart from '../Cart';

class MainArea extends Component {
  constructor() {
    super();
    this.state = {
     products: [],
     shop: {}
   };

   this.addVariantToCart = this.addVariantToCart.bind(this);
  }

  componentWillMount() {
    this.props.client.product.fetchAll().then((res) => {
      this.setState({
        products: res,
      });
    });
    this.props.client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res,
      });
    });
  }

  addVariantToCart(variantId, quantity){

    this.props.changeCartOpenStateToTrue();

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.props.checkoutId

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.props.setCheckoutStateInParent(res);
    });

  }

  render() {
    return(
      <div className="root-inside">
        <Products
          products={this.state.products}
          client={this.props.client}
          addVariantToCart={this.addVariantToCart}
        />
      <footer>{this.state.shop.name} - Copyright 2019 &copy;</footer>
      </div>
    );
  }
}

export default MainArea;
