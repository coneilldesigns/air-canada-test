import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactLoading from 'react-loading';

import Header from './components/Header';
import MainArea from './components/MainArea'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isCartOpen: false,
      shop: {},
      checkout: { lineItems: [] }
    };

    this.changeCartOpenStateToTrue = this.changeCartOpenStateToTrue.bind(this);
    this.handleCartClose = this.handleCartClose.bind(this);
    this.setCheckoutStateInParent = this.setCheckoutStateInParent.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  changeCartOpenStateToTrue() {
    this.setState({
      isCartOpen: true,
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  setCheckoutStateInParent(res) {

    this.setState({
      checkout: res,
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  fetchShop = async () => {
    let response = await this.props.client.shop.fetchInfo();
    let data = await response;
    this.setState({
      shop: data,
    });
    await this.fetchCollections();
  }

  fetchCollections = async () => {
    let response = await this.props.client.collection.fetchAll();
    let data = await response;
    this.setState({
      collections: data,
    });
    await this.fetchCheckoutCreate();
  }

  fetchCheckoutCreate = async () => {
    let response = await this.props.client.checkout.create();
    let data = await response;
    this.setCheckoutStateInParent(data);
  }

  componentDidMount() {
    this.fetchShop();
  }

  render() {
    console.log("GET SHOP DATA: ", this.state.collections);
    if(Object.entries(this.state.shop).length === 0 && this.state.shop.constructor === Object) {
      return (
        <div className="root-inside">
          <div className="main-panel">
            <div className="container h-100 loading-holder">
                <div className="row align-items-center h-100">
                    <div className="col-6 mx-auto loading">
                      <ReactLoading type="spokes" width={15} height={15} />
                    </div>
                </div>
            </div>
        </div>
      </div>
      );
    } else {
      return (
        <div className="root-inside">
          <Router>
            <div className="root-inside">
              <Header
                collections={this.state.collections}
                isCartOpen={this.state.isCartOpen}
                shopName={this.state.shop.name}
                changeCartOpenStateToTrue={this.changeCartOpenStateToTrue}
              />
              <div className="main-panel">
              <div className="root-inside">
                <Route path="/" exact render={(routeProps) => (
                    <MainArea
                      {...routeProps}
                      {...this.props}
                      checkoutId={this.state.checkout.id}
                      changeCartOpenStateToTrue={this.changeCartOpenStateToTrue}
                      setCheckoutStateInParent={this.setCheckoutStateInParent} /> )} />
                    <Route path="/product/:productId" render={(routeProps) => (
                        <SingleProduct
                          {...routeProps}
                          {...this.props}
                          checkoutId={this.state.checkout.id}
                          changeCartOpenStateToTrue={this.changeCartOpenStateToTrue}
                          setCheckoutStateInParent={this.setCheckoutStateInParent}
                           />
                      )} />
              </div>
              </div>
              </div>
             </Router>

           <Cart
            checkout={this.state.checkout}
            isCartOpen={this.state.isCartOpen}
            handleCartClose={this.handleCartClose}
            updateQuantityInCart={this.updateQuantityInCart}
            removeLineItemInCart={this.removeLineItemInCart}
          />
        </div>
      );
    }
  }
}

export default App;
