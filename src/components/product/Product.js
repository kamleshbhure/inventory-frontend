import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deleteProduct, fetchProducts } from '../../state/product/productActions';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            form: '',
            editProductId: null,
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
    }
    
    handleDelete = (productId) => {
        this.props.deleteProduct(productId);
    }
    showModal = (e, form, editProductId) => {
        this.setState({
            show: true,
            form: form,
            editProductId: editProductId
        });
    }
    onClose = e => {
        this.setState({
            show: false,
            form: '',
            editProductId: null
        });
    }
    render() {
        const {products} = this.props;
        return (
            <div className="col-sm mt-4">
                    <div className="row">
                        <div className="col-sm-10">
                            <h2>Products</h2>
                        </div>
                        <div className="col-sm text-right">
                            <button type="button" className="btn btn-warning" 
                            onClick={e => this.showModal(e, 'create')} >Add Product</button>

                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Made in</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products &&
                                products.map((product, index) => 
                                    <tr key={product.id}> 
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.price}</td>
                                        <td>{product.madein}</td>
                                        <td>
                                            <ul className="list-inline m-0">
                                                <li className="list-inline-item">
                                                    <button type="button" className="btn btn-primary" 
                                                    data-toggle="modal" data-target="#modal"
                                                        onClick={e => this.showModal(e, 'edit', product.id)}
                                                        >Edit</button>
                                                </li>
                                                <li className="list-inline-item">
                                                    <button type="button" className="btn btn-danger" 
                                                    onClick={() => { if (window.confirm('Are you sure, you wish to delete this product?')) this.handleDelete(product.id) } }
                                                    >Delete</button>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    )
                            }
                            
                        </tbody>
                    </table>
                    {(this.state.form === 'create')? 
                        <CreateProduct show={this.state.show} onClose={(e) => this.onClose(e)} /> : 
                        (this.state.form === 'edit')? 
                        <EditProduct show={this.state.show} onClose={(e) => this.onClose(e)} productId={this.state.editProductId}/> : ''
                    }
                </div>                
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    console.log(state.product.products);
    return {
        products: state.product.products
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Product))
  