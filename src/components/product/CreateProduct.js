import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createProduct } from '../../state/product/productActions';
import { Modal } from 'react-bootstrap';
import ProductForm from './ProductForm';

class CreateProduct extends Component {
    handleSubmit = (values) => {
        this.props.createProduct(values);
        this.props.onClose();
    }
    onClose = (e) => {
        this.props.onClose(e);
    }
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={(e) => this.onClose(e)}>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <ProductForm handleSubmit={(values) => this.handleSubmit(values)} onClose={this.onClose} />
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
        createProduct: (product) => dispatch(createProduct(product))
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(CreateProduct))