import {
    setSliderImage,
    deleteSliderImage,
    createProduct,
    updateproduct,
    deleteproduct,
    createCategory,
    updateCategory,
    deletecategory,
    getAllUsers,
    changeUserRole,
    getOrderDetail,
    changeOrderStatus,
    getOrders
} from '../common/Api';
import {
    GET_SLIDER_IMAGES,
    CREATE_PRODUCT,
    GET_ADMIN_USERS,
    GET_ALL_USERS,
    GET_NEW_ORDERS,
    GET_ORDER_DETAILS,
    GET_ALL_ORDERS,
    PENDING,
    END_PENDING,
    ADD_ERROR
} from '../common/Constants'
import { isEmpty } from "lodash"

export const setHomeSliderImage = (image) => async dispatch => {
    const formData = new FormData();
    formData.append('homeimage', image);
    setSliderImage(formData).then(images => {
        dispatch({ type: GET_SLIDER_IMAGES, payload: images.sliderImages });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const deleteHomeSliderImage = (id) => async dispatch => {
    deleteSliderImage(id).then(images => {
        dispatch({ type: GET_SLIDER_IMAGES, payload: images.sliderImages });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const setPending = () => {
    return {
        type: PENDING
    }
}

export const addNewProduct = (product) => async dispatch => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('stock', product.stock);
    formData.append('manufacturer', product.manufacturer);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    product.productimage.forEach((element, i) => {
        const newFile = {
            uri: element.uri,
            type: element.type,
            name: element.fileName
        }
        formData.append('productimage', newFile)
    });
    createProduct(formData).then(product => {
        alert('با موفقیت ساخته شد')
        dispatch({ type: CREATE_PRODUCT, payload: product });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const updateProduct = (product) => async dispatch => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('stock', product.stock);
    formData.append('manufacturer', product.manufacturer);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    updateproduct(formData, product.id).then(product => {
        alert('با موفقیت به روز رسانی شد')
        dispatch({ type: CREATE_PRODUCT, payload: product });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const deleteProduct = (id) => async dispatch => {
    deleteproduct(id).then(message => {
        alert('با موفقیت حذف شد')
        dispatch({ type: END_PENDING });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const addNewCategory = (category) => async dispatch => {
    const formData = new FormData();
    formData.append('name', category.name);
    console.log();
    category.parentId ? formData.append('parentId', category.parentId) : null
    if (!isEmpty(category.image))
        formData.append('categoryimage', {
            uri: category.image.uri,
            type: category.image.type,
            name: category.image.fileName
        })
    createCategory(formData).then(message => {
        alert('با موفقیت ساخته شد')
        dispatch({ type: END_PENDING });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const UpdateCategory = (category) => async dispatch => {
    const formData = new FormData();
    formData.append('name', category.name);
    if (category.image)
        formData.append('categoryimage', {
            uri: category.image.uri,
            type: category.image.type,
            name: category.image.fileName
        })
    updateCategory(formData, category.id).then(message => {
        alert('با موفقیت به روز رسانی شد')
        dispatch({ type: END_PENDING });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const deleteCategory = (id) => async dispatch => {
    deletecategory(id).then(message => {
        dispatch({ type: END_PENDING });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getAdminUsers = () => async dispatch => {
    getAllUsers({ role: 'admin' }).then(users => {
        dispatch({ type: GET_ADMIN_USERS, payload: users.result });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getUsers = (email, phoneNumber) => async dispatch => {
    getAllUsers({ email: email, phoneNumber: phoneNumber }).then(users => {
        dispatch({ type: GET_ALL_USERS, users: users.result, count: users.count });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const updateUserRole = (roles, userId) => async dispatch => {
    changeUserRole({ roles: roles }, userId).then(users => {
        dispatch({ type: END_PENDING });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getNewOrders = () => async dispatch => {
    getOrders("processing", "").then(orders => {
        dispatch({ type: GET_NEW_ORDERS, payload: orders });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getAllOrders = (trackingNumber) => async dispatch => {
    getOrders("", trackingNumber).then(orders => {
        dispatch({ type: GET_ALL_ORDERS, payload: orders });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getOrderDetails = (orderId) => async dispatch => {
    getOrderDetail(orderId).then(order => {
        dispatch({ type: GET_ORDER_DETAILS, payload: order, address: order.address });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const ChangeOrderStatus = (orderId) => async dispatch => {
    changeOrderStatus(orderId).then(message => {
        dispatch({ type: END_PENDING });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}