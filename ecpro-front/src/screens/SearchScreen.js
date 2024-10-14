import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    FlatList,
    Text,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../components'
import { searchProducts } from '../actions/SearchActions';

const WINDOW_WIDTH = Dimensions.get('window').width;

const ProductScreen = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const { order, searchText } = route.params
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const pages = useSelector(state => state.product.pages);
    const [Page, setPage] = useState(1);

    const handleLoadMore = async () => {
        if (!Loading) {
            if (Page > pages) {
                setPage(1)
                return
            } else {
                const page = Page + 1
                setPage(page) // increase page by 1
                setLoading(true)
                await dispatch(searchProducts({ order: order, searchText: searchText, page: page })) // method for API call 
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

    useEffect(() => {
        const loadProducts = async () => {
            // await dispatch(clearState())
            setLoading(true);
            await dispatch(searchProducts({ order: order, searchText: searchText }));
            setLoading(false);
        };
        loadProducts();
    }, [dispatch, isFocused]);

    const products = useSelector(state => state.search.products)
    console.log(products)
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: 'white' }}
        >
            <View
                style={styles.contentContainer}
            >
                <FlatList
                    data={products}
                    style={{ right: 8, top: -20 }}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={renderSeparator}
                    ListFooterComponent={renderFooter()}
                    onEndReachedThreshold={0.4}
                    onEndReached={handleLoadMore}
                    showsVerticalScrollIndicator={false}
                    maxToRenderPerBatch={20}
                    windowSize={20}
                    bounces={false}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: "white",
        flex: 1,
        paddingBottom: WINDOW_WIDTH * 0.05,
        paddingTop: WINDOW_WIDTH * 0.05
    },
    title: {
        color: 'black',
        letterSpacing: 0,
        fontSize: WINDOW_WIDTH * 0.043,
        fontWeight: 'bold',
        right: 10
    },
    horizontalLine: {
        borderBottomColor: '#dfdfdf',
        width: WINDOW_WIDTH * 0.93,
        left: 20,
    }
})
export default ProductScreen;