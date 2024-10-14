import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ParallaxImage } from 'react-native-snap-carousel';
import { useIsFocused } from '@react-navigation/native';

import {
    getHomeSliderImage,
    getHomeCategories,
    getLimitedBestSellingProducts,
    getLimitedNewProducts
} from '../actions/HomeActions';
import { Card, CategoryCard, TextButton, MyCarousel } from '../components';
import { API_BASE_URL } from '../common/Constants';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(WINDOW_WIDTH * 0.93);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 6);

const renderItem = ({ item, index }, parallaxProps) => {
    return (
        <>
            <View style={styles.itemContainer}>
                <ParallaxImage
                    source={{ uri: API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}` }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.35}
                    showSpinner={true}
                    loop={true}
                    spinnerColor={'rgba(255, 255, 255, 0.4)'}
                    {...parallaxProps}
                />
                {/* <TouchableOpacity style={{ position: 'absolute', right: 2, top: -2, zIndex: 200 }}>
                    <FontAwesome name='close' size={26} color={'black'} style={{ elevation: 300 }} />
                </TouchableOpacity> */}
            </View>
        </>
    )
}

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    useEffect(() => {
        const loadItems = async () => {
            await dispatch(getHomeSliderImage());
            await dispatch(getHomeCategories(4));
            await dispatch(getLimitedBestSellingProducts(6));
            await dispatch(getLimitedNewProducts(6));
        }
        loadItems();
    }, [dispatch, isFocused]);
    const sliderImages = useSelector(state => state.home.images);
    const categories = useSelector(state => state.home.categories);
    const bestSelling = useSelector(state => state.home.limited_best_selling);
    const newProducts = useSelector(state => state.home.limited_new);
    const Loading = useSelector(state => state.home.Loading);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        alwaysBounceVertical={false}
                    >
                        <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.65, flexDirection: 'row' }}>
                            <MyCarousel
                                data={sliderImages}
                                renderItem={renderItem}
                                autoplay={true}
                                hasParallaxImages={true}
                                viewStyle={{ height: WINDOW_WIDTH * 0.75 }}
                                bounces={false}
                                dotsLength={sliderImages.length}
                            />
                        </View>

                        <View style={{ height: WINDOW_WIDTH * 0.25, alignItems: 'center', justifyContent: 'center', width: WINDOW_WIDTH, paddingLeft: 15, marginBottom: WINDOW_WIDTH * 0.025 }}>
                            <FlatList
                                data={categories}
                                scrollEnabled={false}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ transform: [{ scaleX: -1 }] }}
                                renderItem={({ item, index, separators }) => (
                                    <CategoryCard
                                        key={item.key}
                                        onPress={() => navigation.navigate('Category', {
                                            screen: 'SearchByCategory',
                                            params: {
                                                categoryId: item.id,
                                                categoryName: item.name,
                                                categoryImage: API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}`
                                            }
                                        })}
                                        onShowUnderlay={separators.highlight}
                                        onHideUnderlay={separators.unhighlight}
                                        title={item.name}
                                        image={item.pictureUrl.split("public/").pop()}
                                    />
                                )}
                            />
                        </View>

                        <View style={styles.flatStyle}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <TextButton
                                    title='نمایش همه'
                                    textStyle={{ fontSize: 11 }}
                                    style={{ right: WINDOW_HEIGHT * 0.025 }}
                                    onPress={() => {
                                        navigation.navigate('SearchScreen', {
                                            order: 'salesCount',
                                        })
                                    }}
                                />
                                <Text style={styles.title}>پرفروش ترین کالا ها</Text>
                            </View>
                            <FlatList
                                data={bestSelling.rows}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ transform: [{ scaleX: -1 }] }}
                                renderItem={({ item, index, separators }) => (
                                    <Card
                                        key={item.id}
                                        onPress={() => navigation.navigate('ProductScreen', {
                                            productId: item.id
                                        })}
                                        onShowUnderlay={separators.highlight}
                                        onHideUnderlay={separators.unhighlight}
                                        title={item.name}
                                        image={item.defaultPictureUrl.split("public/").pop()}
                                    />
                                )}
                            />
                        </View>

                        <View style={styles.flatStyle}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <TextButton
                                    title='نمایش همه'
                                    textStyle={{ fontSize: 11 }}
                                    style={{ right: WINDOW_HEIGHT * 0.06 }}
                                    onPress={() => {
                                        navigation.navigate('SearchScreen', {
                                            order: 'createdAt',
                                        })
                                    }}
                                />
                                <Text style={styles.title}>جدیدترین کالا ها</Text>
                            </View>
                            <FlatList
                                data={newProducts.rows}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ transform: [{ scaleX: -1 }] }}
                                renderItem={({ item, index, separators }) => (
                                    <Card
                                        key={item.id}
                                        onPress={() => navigation.navigate('ProductScreen', {
                                            productId: item.id
                                        })}
                                        onShowUnderlay={separators.highlight}
                                        onHideUnderlay={separators.unhighlight}
                                        title={item.name}
                                        image={item.defaultPictureUrl.split("public/").pop()}
                                    />
                                )}
                            />
                        </View>
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        letterSpacing: 0,
        fontSize: WINDOW_WIDTH * 0.043,
        fontWeight: 'bold',
        right: 10
    },
    contentContainer: {
        backgroundColor: "white",
        flexGrow: 1,
        bottom: WINDOW_WIDTH * 0.13
    },
    imageContainer: {
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
        width: WINDOW_WIDTH * 0.95,
        flex: 1
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: {
            height: 8,
            width: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 5,
        borderRadius: 3,
        transform: [{ scaleX: -1 }]
    },
    flatStyle: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: WINDOW_WIDTH,
        height: WINDOW_WIDTH * 0.8,
        paddingVertical: WINDOW_WIDTH * 0.025
    }
})
export default HomeScreen;