import React, { Component } from 'react';
import VariantSelectorSingle from '../VariantSelectorSingle';
import ReactLoading from 'react-loading';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      clicks: 0
    };

    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  addVariantToCart(variantId, quantity){
    console.log(this.props);
    this.props.changeCartOpenStateToTrue();
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.props.checkoutId;

    console.log(checkoutId);

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.props.setCheckoutStateInParent(res);
    });

  }


  setOptions() {
    let defaultOptionValues = {};
    this.state.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.setState({
      selectedOptions: defaultOptionValues
    });
    this.setState({
      selectedVariantQuantity: "1"
    });
    //console.log('STATE FOR SET OPTIONS:', this.state);
  }

  fetchProduct = async () => {
    let response = await this.props.client.product.fetch(this.props.match.params.productId);
    let data = await response;
    this.setState({
      product: data,
    });
    await this.setOptions();
  }


  componentDidMount() {
    this.fetchProduct();
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;
    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.state.product, selectedOptions)
    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
    //console.log(this.state);
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
    //console.log(this.state);
  }

  decrementQuantity() {
    var value = parseInt(document.getElementById('qty-input').value, 10)
    if(value <= 1) {

    } else {
      value = isNaN(value) ? 0 : value;
      value--;
      document.getElementById('qty-input').value = value;
      this.setState({
        selectedVariantQuantity: document.getElementById('qty-input').value
      });
    }

  }

  incrementQuantity(event) {
    var value = parseInt(document.getElementById('qty-input').value, 10)
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('qty-input').value = value;
    this.setState({
      selectedVariantQuantity: document.getElementById('qty-input').value
    });
  }

  render() {
    if (this.state.product === undefined || this.state.product.length == 0) {
        return (
          <div className="container h-100">
              <div className="row align-items-center h-100">
                  <div className="col-6 mx-auto loading">
                          <ReactLoading type="spokes" width={15} height={15} />
                  </div>
              </div>
          </div>
        );
    } else {

      if(this.state.product.availableForSale) {
        var inStock = 'IN STOCK';
        var stockStyle = {
          color: '#727272'
        }
      } else {
        var inStock = 'SOLD OUT';
        var stockStyle = {
          color: 'red'
        }
      }

      var productBg = {
        backgroundImage: 'url(' + this.state.product.images[0].src + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }

      let variantImage = this.state.selectedVariantImage || this.state.product.images[0]
      let variant = this.state.selectedVariant || this.state.product.variants[0]
      let variantQuantity = this.state.selectedVariantQuantity || 1
      let variantSelectorsSingle = this.state.product.options.map((option) => {
        return (
          <VariantSelectorSingle
            handleOptionChange={this.handleOptionChange}
            key={option.id.toString()}
            option={option}
          />
        );
      });


      //console.log('STATE FROM SINGLE PRODUCT:', this.state)
      return(
          <div className="container-fluid h-100 single-product-container">
          <div className="row pr-0 pl-0 h-100">
            <div className="col-md-6 pr-0 pl-0 h-100 colski">
              <div className="product-holder" style={productBg}>
              </div>
            </div>
            <div className="col-md-6 pr-0 pl-0 h-100 text-center d-table colski">
              <div className="d-table-cell align-middle info-area">
                <div className="inside">
                  <h5 style={stockStyle}>
                    {inStock}
                  </h5>
                  <h1>
                    {this.state.product.title}
                  </h1>
                  <h6>
                    By {this.state.product.vendor}
                  </h6>
                  <h2>${this.state.product.variants[0].price}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-var">

            <div className="container-fluid">
              <div className="row">

                <div className="col-md-6 text-center">
                  <div className="row">
                    {variantSelectorsSingle}
                    <div className="col-4">
                      <label className="Product__option qty">
                        <div className="qty-box">
                          <div className="row">
                            <div className="col-4 text-right">
                              <p onClick={this.decrementQuantity.bind(this)}>-</p>
                            </div>
                            <div className="col-4">
                              <input
                                min="1"
                                id="qty-input"
                                readOnly={true}
                                type="number"
                                value={variantQuantity}
                                onChange={this.handleQuantityChange}>
                              </input>
                            </div>
                            <div className="col-4 text-left">
                              <p onClick={this.incrementQuantity.bind(this)}>+</p>
                            </div>
                          </div>
                        </div>
                        <p>Quantity</p>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-right add-btn">
                    <button
                      className="Product__buy button"
                      onClick={() => this.addVariantToCart(variant.id, variantQuantity)}>
                      Add to Cart
                    </button>
                  <h2 className="d-none d-md-block">${this.state.product.variants[0].price * variantQuantity}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SingleProduct;
