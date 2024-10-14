import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, RefreshControl, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
const persian = require('persian');
import { ProductCard, Price, FilledButton, OutOfStockModal, CangedProductCard } from '../components';
import Feather from 'react-native-vector-icons/Feather';
import {
    getShoppingCart,
    decProductQty,
    deleteProductFromCart,
    addProductToCart
} from '../actions/CartActions';
const SCREEN_WIDTH = Dimensions.get('window').width;

const ShoppingCartScreen = (props) => {
    const Dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = () => {
            Dispatch(getShoppingCart());
        }
        loadProducts();
    }, [Dispatch])

    const products = useSelector(state => state.cart.products)
    const count = useSelector(state => state.cart.itemsCount)
    const price = useSelector(state => state.cart.total)
    const priceChanged = useSelector(state => state.cart.priceChanged)
    const outOfStock = useSelector(state => state.cart.outOfStock)
    const changedProducts = priceChanged != null || outOfStock != null ? [...priceChanged, ...outOfStock] : [];
    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, padding: 10 }}>
                <Feather name="more-vertical" size={24} color='black' style={{ right: SCREEN_WIDTH * 0.7 }} />
                <View>
                    <Text style={{ textAlign: 'right', fontSize: 17 }}>دیگر کالاها</Text>
                    <Text style={{ color: '#b1b1b1', textAlign: 'right' }}>{persian.toPersian(count)} کالا</Text>
                </View>
            </View>
        );
    };
    return (
        <>
            {products.length != 0 ?
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ height: SCREEN_WIDTH * 1.28 }}>
                        <FlatList
                            data={products}
                            style={{ right: 8 }}
                            keyExtractor={item => item.productId.toString()}
                            ListHeaderComponent={renderHeader}
                            showsVerticalScrollIndicator={false}
                            maxToRenderPerBatch={20}
                            windowSize={20}
                            bounces={false}
                            renderItem={({ item, index, separators }) => (
                                <ProductCard
                                    key={item.productId}
                                    shoppingCart
                                    qty={item.qty}
                                    trashButton={() => Dispatch(deleteProductFromCart(item.productId))}
                                    decButton={() => Dispatch(decProductQty(item.productId))}
                                    addButton={() => Dispatch(addProductToCart(item.productId))}
                                    onPress={() => props.navigation.navigate('ProductScreen', {
                                        productId: item.productId
                                    })}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}
                                    title={item.name}
                                    image={item.defaultPictureUrl.split("public/").pop()}
                                    price={item.price}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.addToCart}>
                        <Price
                            containerStyle={{ width: SCREEN_WIDTH * 0.27, height: 80, top: 10, alignItems: 'center', justifyContent: 'center' }}
                            textStyle={{ fontSize: SCREEN_WIDTH * 0.044, fontWeight: 'bold', color: 'black', textAlign: 'center', bottom: 8 }}
                            number={price}
                        />
                        <FilledButton title='ادامه فرایند خرید' style={styles.button} textStyle={{ fontSize: SCREEN_WIDTH * 0.04, fontWeight: 'bold' }} onPress={() => props.navigation.navigate('CheckOutScreen')} />
                    </View>
                </View>
                :
                <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center', bottom: 30 }}>
                    <Image source={require('../assets/images/cart2.png')} style={{ width: SCREEN_WIDTH * 0.55, height: SCREEN_WIDTH * 0.55 }} />
                </View>
            }
            {
                changedProducts.length > 0
                    ?
                    <OutOfStockModal
                        ChangedProducts={changedProducts}
                        count={changedProducts.length}
                    />
                    :
                    null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 30,
        paddingLeft: 30,
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 3
    },
    input: {
        marginVertical: 8,
        textAlign: 'right',
    },
    loginButton: {
        marginVertical: 40,
    },
    addToCart: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        bottom: 55,
        left: 0,
        right: 0,
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.18,
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: 0.08,
        elevation: 2
    },
    button: {
        width: SCREEN_WIDTH * 0.5,
        height: SCREEN_WIDTH * 0.14,
        left: SCREEN_WIDTH * 0.15,
        backgroundColor: '#4B8C2B',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ShoppingCartScreen;