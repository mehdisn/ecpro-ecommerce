import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    FlatList,
    Text,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Image
} from 'react-native';
const persian = require('persian');
import { API_BASE_URL } from '../common/Constants';
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../components'
import { getProductByCategory, refreshProductList, clearState } from '../actions/ProductActions';

const WINDOW_WIDTH = Dimensions.get('window').width;

const ProductScreen = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const { categoryId, categoryName, categoryImage } = route.params;
    const dispatch = useDispatch();
    const [Refreshing, setRefreshing] = useState(false);
    const [Loading, setLoading] = useState(true);
    const pages = useSelector(state => state.product.pages);
    const [Page, setPage] = useState(1);
    const products = useSelector(state => state.product.products)
    const categories = useSelector(state => state.product.child_categories)
    const role = useSelector(state => state.auth.role)
    const count = useSelector(state => state.product.count)

    useEffect(() => {
        const loadProducts = async () => {
            await dispatch(clearState())
            setLoading(true);
            await dispatch(refreshProductList(categoryId));
            setLoading(false);
        };
        loadProducts();
    }, [dispatch, isFocused]);

    const handleLoadMore = async () => {
        if (!Loading) {
            if (Page > pages) {
                setPage(1)
                return
            } else {
                const page = Page + 1
                setPage(page) // increase page by 1
                setLoading(true)
                await dispatch(getProductByCategory(categoryId, page)) // method for API call 
                setLoading(false)
            }
        }
    };

    const renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!Loading) return null;
        return (
            <ActivityIndicator
                style={{ color: '#000' }}
            />
        );
    };

    const renderHeader = () => {
        return (
            <View style={{}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 10, borderBottomColor: '#e2e2e2' }}>
                    {
                        role.includes("ROLE_ADMIN")
                            ?
                            <View style={{ borderBottomWidth: 10, borderBottomColor: '#e2e2e2', width: WINDOW_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        style={styles.imageList}
                                        onPress={() => {
                                            navigation.navigate('ShoppingCart', {
                                                screen: "AddProductScreen",
                                                params: {
                                                    categoryId: categoryId,
                                                    editing: false
                                                }
                                            })
                                        }}
                                    >
                                        <View style={styles.astyle}>
                                            <Text numberOfLines={1} style={{ fontSize: 12, margin: 20 }}>افزودن محصول</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.imageList}
                                        onPress={() => {
                                            navigation.navigate('ShoppingCart', {
                                                screen: "CategoryCrmScreen",
                                                params: {
                                                    categoryId: categoryId,
                                                    editing: false
                                                }
                                            })
                                        }}
                                    >
                                        <View style={styles.astyle}>
                                            <Text numberOfLines={1} style={{ fontSize: 12, margin: 20 }}>افزودن دسته</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={[styles.imageList, { width: WINDOW_WIDTH * 0.6, marginVertical: 0, marginBottom: 10 }]}
                                    onPress={() => {
                                        navigation.navigate('ShoppingCart', {
                                            screen: "CategoryCrmScreen",
                                            params: {
                                                categoryId: categoryId,
                                                name: categoryName,
                                                image: categoryImage,
                                                editing: true
                                            }
                                        })
                                    }}
                                >
                                    <View style={[styles.astyle, { width: WINDOW_WIDTH * 0.4 }]}>
                                        <Text numberOfLines={1} style={{ fontSize: 12, margin: 20 }}>ویرایش دسته ی جاری</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }
                    {
                        categories.length > 0
                            ?
                            <FlatList
                                data={categories}
                                keyExtractor={item => item.id.toString()}
                                numColumns={3}
                                style={{}}
                                renderItem={({ item, index, separators }) => (
                                    <TouchableOpacity
                                        style={styles.imageList}
                                        onPress={() => {
                                            dispatch(refreshProductList(item.id));
                                            navigation.navigate('SearchByCategory', {
                                                categoryId: item.id,
                                                categoryName: item.name
                                            })
                                        }}
                                    >
                                        <View style={{ alignItems: 'center', justifyContent: 'center', width: WINDOW_WIDTH * 0.29, height: WINDOW_WIDTH * 0.24 }}>
                                            <Image
                                                source={{ uri: API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}` }}
                                                style={{ resizeMode: 'contain', width: WINDOW_WIDTH * 0.22, height: WINDOW_WIDTH * 0.25 }}
                                            />
                                        </View>
                                        <View style={styles.astyle}>
                                            <Text numberOfLines={1} style={{ fontSize: 12, margin: 20 }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                            :
                            null
                    }
                </View>
                <View style={{ flex: 1, paddingVertical: 10, right: 5 }}>
                    <Text style={{ textAlign: 'right', color: '#b1b1b1' }}>{categoryName}</Text>
                    <Text style={{ top: -15, left: 15, textAlign: 'left', color: '#b1b1b1' }}>{persian.toPersian(count)} کالا</Text>
                </View>
            </View>
        );
    };

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        );
    };

    const onRefresh = async () => {
        setPage(1)
        setRefreshing(true);
        await dispatch(refreshProductList(categoryId))
        setRefreshing(false);
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: 'white' }}
        >
            {
                Loading
                    ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator
                            size='large'
                            color='#4B8C2B'
                        />
                    </View>
                    :
                    <View
                        style={styles.contentContainer}
                    >
                        <FlatList
                            data={products}
                            style={{}}
                            refreshControl={
                                <RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />
                            }
                            keyExtractor={item => item.id.toString()}
                            ItemSeparatorComponent={renderSeparator}
                            ListFooterComponent={renderFooter()}
                            ListHeaderComponent={renderHeader}
                            onEndReachedThreshold={0.4}
                            onEndReached={handleLoadMore}
                            showsVerticalScrollIndicator={false}
                            maxToRenderPerBatch={20}
                            windowSize={20}
                            bouncesZoom={50}
                            renderItem={({ item, index, separators }) => (
                                <>
                                    <ProductCard
                                        key={item.id}
                                        onPress={() => navigation.navigate('ProductScreen', {
                                            productId: item.id
                                        })}
                                        onShowUnderlay={separators.highlight}
                                        onHideUnderlay={separators.unhighlight}
                                        title={item.name}
                                        image={item.defaultPictureUrl.split("public/").pop()}
                                        price={item.price}
                                    />
                                </>
                            )}
                        />
                    </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: "white",
        flex: 1,
        marginBottom: WINDOW_WIDTH * 0.13
    },
    title: {
        color: 'black',
        letterSpacing: 0,
        fontSize: WINDOW_WIDTH * 0.043,
        fontWeight: 'bold',
        right: 10
    },
    imageList: {
        alignItems: 'center',
        justifyContent: 'center',
        width: WINDOW_WIDTH * 0.3,
        height: WINDOW_WIDTH * 0.3,
        backgroundColor: '#EFEFEF',
        margin: 5,
        borderRadius: 5,
        marginVertical: 10
    },
    astyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        width: WINDOW_WIDTH * 0.3
    }
})
export default ProductScreen;