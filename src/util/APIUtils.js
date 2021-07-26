import { ACCESS_TOKEN, API_BASE_URL } from "..";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function fetchAllProducts() {
    return request({
        url: API_BASE_URL + "/api/products",
        method: 'GET'
    });
}

export function getProduct(id) {
    return request({
        url: API_BASE_URL + "/api/products/"+id,
        method: 'GET'
    });
}

export function addProduct(productRequest) {
    return request({
        url: API_BASE_URL + "/api/products",
        method: 'POST',
        body: JSON.stringify(productRequest)
    });
}

export function updateProduct(productRequest, productId) {
    return request({
        url: API_BASE_URL + "/api/products/"+productId,
        method: 'PUT',
        body: JSON.stringify(productRequest)
    });
}

export function deleteProducts(id) {
    return request({
        url: API_BASE_URL + "/api/products/"+id,
        method: 'DELETE'
    });
}

export function getProductDetailsSoapAPI(id) {
    return request({
        url: API_BASE_URL + "/soap/consume/"+id,
        method: 'GET'
    });
}
