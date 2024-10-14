import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, FlatList, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../common/Constants';
import { getAllCategories } from '../actions/CategoryActions';

const WINDOW_WIDTH = Dimensions.get('window').width;

const CategoryScreen = (props) => {
    const focused = useIsFocused()
    const role = useSelector(state => state.auth.role)
    EvilIcons.loadFont()
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = async () => {
            await dispatch(getAllCategories());
        };
        loadProducts();
    }, [dispatch, focused]);

    const showAll = (item) => {
        return (
            <TouchableOpacity
                style={[styles.imageList, { transform: [{ scaleX: 1 }] }]}
                onPress={() => {
                    console.log(item.pictureUrl)
                    props.navigation.navigate('SearchByCategory', {
                        categoryId: item.id,
                        categoryName: item.name,
                        categoryImage: API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}`
                    })
                }}
            >
                <View style={{ transform: [{ scaleX: -1 }], width: WINDOW_WIDTH * 0.35, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <EvilIcons name='arrow-left' size={WINDOW_WIDTH * 0.15} color='#3596FF' />
                    <Text style={{ fontSize: 13, fontWeight: '100', top: 4 }}>مشاهده همه</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const addCategory = () => {
        return (
            <TouchableOpacity
                style={[styles.headerStyle]}
                onPress={() => {
                    props.navigation.navigate('ShoppingCart', {
                        screen: "CategoryCrmScreen",
                        params: {
                            categoryId: null,
                            editing: false
                        }
                    })
                }}
            >
                <View style={[styles.astyle]}>
                    <Text numberOfLines={1} style={{ fontSize: 12, margin: 20 }}>افزودن دسته بندی جدید</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const categories = useSelector(state => state.category.categories);
    const Loading = useSelector(state => state.category.Loading);
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
                    <View style={[{ flex: 1 }, styles.contentContainer]}>
                        <FlatList
                            data={categories}
                            keyExtractor={item => item.id.toString()}
                            style={{ marginBottom: WINDOW_WIDTH * 0.12 }}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={role.includes("ROLE_ADMIN") ? addCategory() : null}
                            renderItem={({ item, index, separators }) => (
                                <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: WINDOW_WIDTH, flex: 1, paddingVertical: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
                                        <Text style={styles.title}>{item.name}</Text>
                                    </View>
                                    <FlatList
                                        data={item.childs}
                                        keyExtractor={item => item.id.toString()}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        ListFooterComponent={showAll(item)}
                                        style={{ width: WINDOW_WIDTH, transform: [{ scaleX: -1 }], paddingHorizontal: 10 }}
                                        renderItem={({ item, index, separators }) => (
                                            <TouchableOpacity
                                                style={styles.imageList}
                                                onPress={() => {
                                                    console.log(API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}`)
                                                    props.navigation.navigate('SearchByCategory', {
                                                        categoryId: item.id,
                                                        categoryName: item.name,
                                                        categoryImage: API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}`
                                                    })
                                                }}
                                            >
                                                <View style={{ alignItems: 'center', justifyContent: 'center', width: WINDOW_WIDTH * 0.3, height: WINDOW_WIDTH * 0.28 }}>
                                                    <Image
                                                        source={{ uri: API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}` }}
                                                        style={{ resizeMode: 'contain', width: WINDOW_WIDTH * 0.23, height: WINDOW_WIDTH * 0.23 }}
                                                    />
                                                </View>
                                                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', width: WINDOW_WIDTH * 0.3 }}>
                                                    <Text numberOfLines={1} style={{ fontSize: 12, margin: 20 }}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            )}
                        />
                    </View>
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
        right: 10,
    },
    contentContainer: {
        backgroundColor: "white",
        flex: 1
    },
    imageList: {
        alignItems: 'center',
        justifyContent: 'center',
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.35,
        transform: [{ scaleX: -1 }],
        backgroundColor: '#EFEFEF',
        margin: 5,
        borderRadius: 5
    },
    headerStyle: {
        backgroundColor: '#EFEFEF',
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        margin: 10
    }
})
export default CategoryScreen;