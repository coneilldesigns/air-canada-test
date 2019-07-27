import React, { Component } from 'react';
import Product from './Product';

class Products extends Component {
  render() {
    let products = this.props.products.map((product) => {
      return (
          <Product
            addVariantToCart={this.props.addVariantToCart}
            client={this.props.client}
            key={product.id.toString()}
            product={product}
          />
      );
    });

    return (
      <div className="row pr-0 pl-0 h-100">
        {products}
      </div>
    );
  }
}

export default Products;
