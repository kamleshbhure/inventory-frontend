import { addProduct, deleteProducts, fetchAllProducts, updateProduct } from '../../util/APIUtils';
import { 
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAILURE,
  PRODUCT_DELETE,
  PRODUCT_DELETE_FAILURE, 
  PRODUCT_SAVE_FAILURE, 
  PRODUCT_CREATE,
  PRODUCT_UPDATE
} from './productTypes';

export const fetchProducts = () => {
    return (dispatch) => {
      dispatch(fetchProductsRequest())
      fetchAllProducts()
          .then(response => {
            dispatch(fetchProductsSuccess(response));
          }).catch(error => {
            dispatch(fetchProductsFailure(error));
          });
    }
  }
  
  export const fetchProductsRequest = () => {
    return {
      type: PRODUCT_REQUEST
    }
  }
  
  export const fetchProductsSuccess = response => {
    return {
      type: PRODUCT_SUCCESS,
      payload: response
    }
  }
  
  export const fetchProductsFailure = error => {
    return {
      type: PRODUCT_FAILURE,
      payload: error
    }
  }

  export const createProduct = (request) => {
    return (dispatch) => {
      addProduct(request)
          .then(response => {
            dispatch(createProductRequest(response))
          }).catch(error => {
            dispatch(saveProductFailure(error));
          });
    }
  }
  
  export const createProductRequest = (response) => {
    return {
      type: PRODUCT_CREATE,
      payload: response
    }
  }

  export const editProduct = (request, productId) => {
    return (dispatch) => {
      updateProduct(request, productId)
          .then(response => {
            dispatch(updateProductRequest(response))
          }).catch(error => {
            dispatch(saveProductFailure(error));
          });
    }
  }
  
  export const updateProductRequest = (response) => {
    return {
      type: PRODUCT_UPDATE,
      payload: response
    }
  }
  
  export const saveProductFailure = error => {
    return {
      type: PRODUCT_SAVE_FAILURE,
      payload: error
    }
  }

  export const deleteProduct = (request) => {
    return (dispatch) => {
      deleteProducts(request)
          .then(response => {
            dispatch(deleteProductRequest(response));
          }).catch(error => {
            dispatch(deleteProductFailure(error));
          });
    }
  }
  
  export const deleteProductRequest = (request) => {
    return {
      type: PRODUCT_DELETE,
      payload: request
    }
  }
  
  export const deleteProductFailure = error => {
    return {
      type: PRODUCT_DELETE_FAILURE,
      payload: error
    }
  }