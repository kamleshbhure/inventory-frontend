import React from 'react';
import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { editProduct } from '../../state/product/productActions';
import ProductForm from './ProductForm';

class EditProduct extends Component {
    handleSubmit = (values) => {
        this.props.editProduct(values, this.props.productId);
        this.props.onClose();
    }
    onClose = (e) => {
        this.props.onClose(e);
    }
    render() {
        let product = this.props.products.find((product)=>product.id === this.props.productId);
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={(e) => this.onClose(e)}>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <ProductForm handleSubmit={(values) => this.handleSubmit(values)} onClose={this.onClose} product={product}/>
            </Modal>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.product.products
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        editProduct: (product, productId) => dispatch(editProduct(product, productId))
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(EditProduct))