import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import { useIsFocused } from '@react-navigation/native';
import persian from 'persian';
import { ParallaxImage } from 'react-native-snap-carousel';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { MyCarousel } from '../components';
import {
    TextButton,
    RatingStars,
    HorizontalLine,
    TouchableButton,
    Price,
    FilledButton,
    Comment
} from '../components';
import { findProductDetails } from '../actions/ProductActions';
import { getShoppingCart, deleteProductFromCart, addProductToCart } from '../actions/CartActions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { API_BASE_URL } from '../common/Constants';

const SLIDER_WIDTH = Dimensions.get('window').width;

const renderItem = ({ item, index }, parallaxProps) => {
    return (
        <View style={styles.itemContainer}>
            <ParallaxImage
                source={{ uri: API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}` }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={'rgba(255, 255, 255, 0.4)'}
                {...parallaxProps}
            />
        </View>
    )
}

const ProductScreen = (props) => {
    EvilIcons.loadFont();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    useEffect(() => {
        const loadProduct = async () => {
            await dispatch(findProductDetails(props.route.params.productId));
        };
        loadProduct();
    }, [dispatch, isFocused]);

    const showAll = () => {
        return (
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('commentsScreen', { productId: product.id })}>
                <View style={{ transform: [{ scaleX: -1 }], width: SLIDER_WIDTH * 0.35, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <EvilIcons name='arrow-left' size={SLIDER_WIDTH * 0.15} color='#3596FF' />
                    <Text style={{ fontSize: 13, fontWeight: '100', top: 4 }}>مشاهده همه</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const product = useSelector(state => state.product.product);
    const product_images = useSelector(state => state.product.productImages);
    const cartProducts = useSelector(state => state.cart.products)
    const commentCount = useSelector(state => state.product.commentCount)
    const role = useSelector(state => state.auth.role);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
                bounces={false}
            >
                <MyCarousel
                    data={product_images}
                    loop={false}
                    itemWidth={SLIDER_WIDTH}
                    containerStyle={{ flex: 1, paddingTop: SLIDER_WIDTH * 0.1 }}
                    renderItem={renderItem}
                    paginationContainer={styles.paginationContainer}
                    bounces={false}
                    paginationDot={styles.paginationDot}
                    inactiveDotColor={'transparent'}
                    inactiveDotOpacity={0.6}
                    inactiveDotScale={1}
                    hasParallaxImages={true}
                    dotsLength={product_images.length}
                />
                <View style={styles.contentStyle}>
                    <View style={{ flex: 1, height: SLIDER_WIDTH * 0.2, marginTop: SLIDER_WIDTH * 0.06 }}>
                        <TextButton title={product.manufacturer} style={{ textAlign: 'right', alignItems: 'flex-end', bottom: 10 }} />
                        <Text style={{ fontWeight: 'bold', textAlign: 'right', fontSize: 16, top: -10 }}>{product.name}</Text>
                        <RatingStars
                            containerStyle={{ justifyContent: 'flex-start', position: 'absolute', top: SLIDER_WIDTH * 0.15 }}
                            starStyle={{
                                width: 12,
                                height: 12
                            }}
                            ratingObj={{
                                ratings: 5,
                                views: 34000
                            }}
                        />
                    </View>
                    <HorizontalLine style={{ borderBottomColor: '#e2e2e2', borderBottomWidth: 10, width: SLIDER_WIDTH, right: 15 }} />
                    <View style={{ top: 15, flex: 2 }}>
                        <Text style={{ textAlign: 'right', fontWeight: 'bold', color: '#202020', fontSize: 16 }}>نقد و بررسی</Text>
                        <Text numberOfLines={5} style={{ textAlign: 'right', top: 10, fontSize: 14 }}>{product.description}</Text>
                        <HorizontalLine style={{ top: 25, borderBottomColor: '#e2e2e2' }} />
                        <View style={{ top: 6, borderBottomWidth: 1, height: SLIDER_WIDTH * 0.19, borderBottomColor: '#e2e2e2' }}>
                            <TouchableButton title="نقد و بررسی تخصصی" />
                        </View>
                        <HorizontalLine style={{ borderBottomColor: '#e2e2e2', width: SLIDER_WIDTH, right: 15, borderBottomWidth: 10 }} />
                    </View>
                    <View style={[styles.comments, { height: commentCount != 0 ? SLIDER_WIDTH * 0.74 : SLIDER_WIDTH * 0.4, }]}>
                        <Text style={{ textAlign: 'right', fontWeight: 'bold', color: '#202020', fontSize: 16 }}>نظرات کاربران</Text>
                        {
                            commentCount === 0 ?
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ fontSize: 15 }}>هیچ نظری برای این محصول ثبت نشده است</Text>
                                    <TextButton title="افزودن نظر" style={{ paddingTop: 10 }} textStyle={{ fontSize: 16 }} onPress={() => props.navigation.navigate('addCommentScreen', { productId: product.id })} />
                                </View>
                                :
                                <>
                                    <TextButton title={persian.toPersian(commentCount) + " نظر"} style={{ alignItems: 'flex-start' }} textStyle={{ fontSize: 13, top: -13 }} onPress={() => props.navigation.navigate('commentsScreen', { productId: product.id })} />
                                    <FlatList
                                        data={product.comments}
                                        style={{ transform: [{ scaleX: -1 }] }}
                                        keyExtractor={item => item.id.toString()}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        windowSize={3}
                                        initialNumToRender={3}
                                        bounces={false}
                                        ListFooterComponent={showAll()}
                                        renderItem={({ item, index, separators }) => (
                                            <>
                                                <Comment
                                                    key={item.id}
                                                    title={item.title}
                                                    content={item.content}
                                                    createdAt={"2020-11-03T10:18:44.124Z"}
                                                    rating={item.rating}
                                                    fullName={item.fullName}
                                                    onPress={() => props.navigation.navigate('commentsScreen', {
                                                        productId: product.id
                                                    })}
                                                />
                                            </>
                                        )}
                                    />
                                </>
                        }
                    </View>
                </View>
            </ScrollView>

            <View style={styles.addToCart}>
                <Price
                    containerStyle={{ width: SLIDER_WIDTH * 0.27, height: 80, top: 10, alignItems: 'center', justifyContent: 'center' }}
                    textStyle={{ fontSize: SLIDER_WIDTH * 0.044, fontWeight: 'bold', color: 'black', textAlign: 'center', bottom: 8 }}
                    number={product.price}
                />
                {
                    cartProducts.length > 0 && cartProducts.find(Product => Product.productId === product.id)
                        ?
                        <View style={{ borderWidth: 1, borderColor: '#dfdfdf', width: SLIDER_WIDTH * 0.5, height: SLIDER_WIDTH * 0.14, borderRadius: 6, padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ flex: 2 }} onPress={() => dispatch(deleteProductFromCart(product.id))}>
                                <Octicons name="trashcan" size={24} color='#171A40' />
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 20, textAlign: 'left', right: 5 }}>{cartProducts.find(Product => Product.productId === product.id).qty}</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 1, right: -15 }} onPress={() => dispatch(addProductToCart(product.id))}>
                                <AntDesign name="plus" size={24} color='#171A40' />
                            </TouchableOpacity>
                        </View>
                        :
                        role.includes("ROLE_ADMIN")
                            ?
                            <FilledButton
                                title='ویرایش محصول'
                                style={styles.button}
                                textStyle={{ fontSize: SLIDER_WIDTH * 0.04, fontWeight: 'bold' }}
                                onPress={() => {
                                    props.navigation.navigate('ShoppingCart', {
                                        screen: "AddProductScreen",
                                        params: {
                                            name: product.name,
                                            stock: product.stock,
                                            manufacturer: product.manufacturer,
                                            price: product.price,
                                            description: product.description,
                                            editing: true,
                                            id: product.id
                                        }
                                    })
                                }}
                            />
                            :
                            <FilledButton
                                title='افزودن به سبد خرید'
                                style={styles.button}
                                textStyle={{ fontSize: SLIDER_WIDTH * 0.04, fontWeight: 'bold' }}
                                onPress={() => {
                                    dispatch(addProductToCart(product.id))
                                    dispatch(getShoppingCart());
                                }}
                            />
                }
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    contentStyle: {
        padding: 15,
        flex: 1,
        paddingBottom: 80
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 8,
        marginHorizontal: -4,
        backgroundColor: 'transparent',
        borderColor: '#000',
        borderWidth: 1.5,
    },
    paginationContainer: {
        bottom: SLIDER_WIDTH * 0.05,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    addToCart: {
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        width: SLIDER_WIDTH,
        height: SLIDER_WIDTH * 0.18,
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: 0.08,
        elevation: 6,
    },
    button: {
        width: SLIDER_WIDTH * 0.5,
        height: SLIDER_WIDTH * 0.14,
        backgroundColor: '#4B8C2B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    comments: {
        flex: 2,
        paddingTop: 30,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
        width: SLIDER_WIDTH,
        height: SLIDER_WIDTH * 0.7
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    }
})

export default ProductScreen;