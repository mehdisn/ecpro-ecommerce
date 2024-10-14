import AsyncStorage from '@react-native-community/async-storage';
import { API_BASE_URL, ACCESS_TOKEN } from '../common/Constants';

const request = async (options, formData = false) => {
    const headers = new Headers({
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    })

    if (await AsyncStorage.getItem(ACCESS_TOKEN)) {
        headers.append('x-access-token', await AsyncStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function bootstrap() {
    return request({
        url: API_BASE_URL + "/api/auth/bootstrap",
        method: 'POST'
    });
}

export function otpgen(otpgenRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/otpgen",
        method: 'POST',
        body: JSON.stringify(otpgenRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getCategories(categoryRequest) {
    return request({
        url: API_BASE_URL + "/api/category/head",
        method: 'POST',
        body: JSON.stringify(categoryRequest)
    });
}

export function findProductByCategory(categoryId, page) {
    return request({
        url: API_BASE_URL + `/api/product/category/${categoryId}?page=${page}`,
        method: 'GET'
    });
}

export function findProductById(productId) {
    return request({
        url: API_BASE_URL + `/api/product/${productId}`,
        method: 'GET'
    });
}

export function findProductComments(productId) {
    return request({
        url: API_BASE_URL + `/api/comment?productId=${productId}`,
        method: 'GET'
    });
}

export function findAllProducts(productRequest) {
    return request({
        url: API_BASE_URL + `/api/product/all?page=${productRequest.page}`,
        method: 'POST',
        body: JSON.stringify(productRequest)
    });
}

export function createComment(commentRequest) {
    return request({
        url: API_BASE_URL + `/api/product/comment?productId=${commentRequest.productId}`,
        method: 'POST',
        body: JSON.stringify(commentRequest)
    });
}

export function addToCart(cartRequest) {
    return request({
        url: API_BASE_URL + `/api/cart`,
        method: 'POST',
        body: JSON.stringify(cartRequest)
    });
}

export function getCart() {
    return request({
        url: API_BASE_URL + `/api/cart`,
        method: 'GET'
    });
}

export function deleteFromCart(productId) {
    return request({
        url: API_BASE_URL + `/api/cart/${productId}`,
        method: 'DELETE'
    });
}

export function decQty(productId) {
    return request({
        url: API_BASE_URL + `/api/cart/${productId}`,
        method: 'PUT'
    });
}

export function getAddresses() {
    return request({
        url: API_BASE_URL + `/api/address`,
        method: 'GET'
    });
}

export function addAddress(addressRequest) {
    return request({
        url: API_BASE_URL + `/api/address`,
        method: 'POST',
        body: JSON.stringify(addressRequest)
    });
}

export function deleteAddress(addressId) {
    return request({
        url: API_BASE_URL + `/api/address/${addressId}`,
        method: 'DELETE'
    });
}

export function getSelectedAddress() {
    return request({
        url: API_BASE_URL + `/api/address/selected`,
        method: 'GET'
    });
}

export function setSelectedAddress(addressId) {
    return request({
        url: API_BASE_URL + `/api/address/${addressId}`,
        method: 'PUT'
    });
}

export function createOrder(orderRequest) {
    return request({
        url: API_BASE_URL + `/api/order`,
        method: 'POST',
        body: JSON.stringify(orderRequest)
    });
}

export function getSliderImage() {
    return request({
        url: API_BASE_URL + `/api/homeSlider`,
        method: 'GET'
    });
}

export function setSliderImage(sliderImageRequest) {
    return request({
        url: API_BASE_URL + `/api/homeSlider`,
        method: 'POST',
        body: sliderImageRequest
    }, true);
}

export function deleteSliderImage(sliderImageId) {
    return request({
        url: API_BASE_URL + `/api/homeSlider/${sliderImageId}`,
        method: 'DELETE',
    });
}

export function createProduct(productRequest) {
    return request({
        url: API_BASE_URL + `/api/product`,
        method: 'POST',
        body: productRequest
    }, true);
}

export function updateproduct(productRequest, id) {
    return request({
        url: API_BASE_URL + `/api/product/${id}`,
        method: 'PUT',
        body: productRequest
    }, true);
}

export function deleteproduct(id) {
    return request({
        url: API_BASE_URL + `/api/product/${id}`,
        method: 'DELETE'
    });
}

export function createCategory(categoryRequest) {
    return request({
        url: API_BASE_URL + `/api/category`,
        method: 'POST',
        body: categoryRequest
    }, true);
}

export function updateCategory(categoryRequest, id) {
    return request({
        url: API_BASE_URL + `/api/category/${id}`,
        method: 'PUT',
        body: categoryRequest
    }, true);
}

export function deletecategory(id) {
    return request({
        url: API_BASE_URL + `/api/category/${id}`,
        method: 'DELETE'
    });
}

export function getAllUsers(getUsersRequest) {
    return request({
        url: API_BASE_URL + `/api/users`,
        method: 'POST',
        body: JSON.stringify(getUsersRequest)
    });
}

export function changeUserRole(changeRoleRequest, userId) {
    console.log(changeRoleRequest, userId)
    return request({
        url: API_BASE_URL + `/api/users/${userId}`,
        method: 'PUT',
        body: JSON.stringify(changeRoleRequest)
    });
}

export function getOrders(orderStatus, trackingNumber) {
    return request({
        url: API_BASE_URL + `/api/order?status=${orderStatus}&trackingNumber=${trackingNumber}`,
        method: 'GET'
    });
}

export function getOrderDetail(orderId) {
    return request({
        url: API_BASE_URL + `/api/order/${orderId}`,
        method: 'GET'
    });
}

export function changeOrderStatus(orderId) {
    return request({
        url: API_BASE_URL + `/api/order/${orderId}`,
        method: 'PUT'
    });
}