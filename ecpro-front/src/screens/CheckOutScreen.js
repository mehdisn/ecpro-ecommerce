import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, FlatList, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
const persian = require('persian');
import { API_BASE_URL } from '../common/Constants';
import { TextButton, Price, FilledButton } from '../components';
import {
    _getSelectedAddress
} from '../actions/OrderActions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const WINDOW_WIDTH = Dimensions.get('window').width;

const CheckOutScreen = (props) => {
    SimpleLineIcons.loadFont();
    const Dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = () => {
            Dispatch(_getSelectedAddress());
        }
        loadProducts();
    }, [Dispatch])

    const products = useSelector(state => state.cart.products);
    const count = useSelector(state => state.cart.itemsCount);
    const price = useSelector(state => state.cart.total);
    const selectedAddress = useSelector(state => state.order.selectedAddress);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.contentContainer} bounces={false}>
                <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.35, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-end', padding: 10, borderBottomWidth: 10, borderBottomColor: '#e2e2e2' }}>
                    <View style={{ width: WINDOW_WIDTH * 0.8 }}>
                        <Text style={{ color: 'gray', textAlign: 'right' }}>ارسال به</Text>
                        {
                            selectedAddress.length != 0 ?
                                <View style={{ width: '100%', top: WINDOW_WIDTH * 0.03, paddingHorizontal: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text style={styles.textAddress} numberOfLines={1}>{selectedAddress.address}</Text>
                                        <Text style={styles.textAddress}> ,</Text>
                                        <Text style={styles.textAddress}>{selectedAddress.city}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 3 }}>
                                        <Text style={styles.textAddress} numberOfLines={1}>{selectedAddress.lastName}</Text>
                                        <Text> </Text>
                                        <Text style={styles.textAddress} numberOfLines={1}>{selectedAddress.firstName}</Text>
                                    </View>
                                    <TextButton
                                        title='تغییر یا ویرایش آدرس'
                                        textStyle={{ fontSize: WINDOW_WIDTH * 0.035 }}
                                        style={{ alignItems: 'flex-start', top: WINDOW_WIDTH * 0.02 }}
                                        onPress={() => props.navigation.navigate('SelectAddressScreen')}
                                    />
                                </View>
                                :
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('SelectAddressScreen')}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: WINDOW_WIDTH * 0.05, top: WINDOW_WIDTH * 0.04, fontWeight: 'bold' }} >شما هنوز آدرسی وارد نکرده اید</Text>
                                    <TextButton title='افرودن آدرس' textStyle={{ fontSize: WINDOW_WIDTH * 0.048, top: WINDOW_WIDTH * 0.07, fontWeight: 'bold' }} onPress={() => props.navigation.navigate('SelectAddressScreen')} />
                                </TouchableOpacity>
                        }
                    </View>
                    <SimpleLineIcons name='location-pin' size={24} style={{ paddingVertical: 25, paddingHorizontal: 10 }} />
                </View>
                <View style={{ alignItems: 'flex-end', padding: 20, borderBottomWidth: 10, borderBottomColor: '#e2e2e2', width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.7, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>جزیات ارسال</Text>
                    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
                        <Text style={{ color: '#b1b1b1', textAlign: 'right' }}>{persian.toPersian(count)} کالا</Text>
                        <Text style={{ paddingHorizontal: 10, color: '#BB4653' }}>ارسال عادی</Text>
                        <Feather name="truck" size={20} color='#BB4653' style={{ transform: [{ scaleX: -1 }] }} />
                    </View>
                    <FlatList
                        data={products}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        maxToRenderPerBatch={20}
                        windowSize={20}
                        bounces={false}
                        horizontal
                        renderItem={({ item, index, separators }) => (
                            <View style={{ backgroundColor: 'white', width: 150, alignItems: 'center', justifyContent: 'flex-start', borderLeftWidth: 1, borderLeftColor: '#DEDEDE' }}>
                                <Image
                                    source={{ uri: API_BASE_URL + `/${item.defaultPictureUrl.split("public/").pop()}` }}
                                    style={{ resizeMode: 'contain', height: WINDOW_WIDTH * 0.32, width: WINDOW_WIDTH * 0.32, top: WINDOW_WIDTH * 0.01 }}
                                />
                            </View>
                        )}
                    />
                    <View style={{ flexDirection: 'row', paddingVertical: 7 }}>
                        <Text style={{}}>  رایگان</Text>
                        <Text style={{ color: 'gray', }}>هزینه ارسال: </Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', padding: 20, width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.6, borderBottomWidth: 10, borderBottomColor: '#e2e2e2' }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
                        <Text style={{ color: '#b1b1b1', textAlign: 'right', paddingRight: 10 }}>{persian.toPersian(count)} کالا</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>جزیات قیمت</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 7, width: WINDOW_WIDTH * 0.9, justifyContent: 'space-between' }}>
                        <Price
                            textStyle={{ color: 'black', fontWeight: 'bold' }}
                            number={price}
                        />
                        <Text>  </Text>
                        <Text style={{ color: 'gray', }}>مبلغ کل کالاها: </Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 7, width: WINDOW_WIDTH * 0.9, justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold' }}>  رایگان</Text>
                        <Text style={{ color: 'gray', }}>هزینه ارسال: </Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 7, width: WINDOW_WIDTH * 0.9, justifyContent: 'space-between' }}>
                        <Price
                            textStyle={{ color: 'black', fontWeight: 'bold' }}
                            number={price}
                        />
                        <Text>  </Text>
                        <Text style={{ color: 'gray', }}>جمع کل: </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.addToCart}>
                <Price
                    textStyle={{ fontSize: WINDOW_WIDTH * 0.046, fontWeight: 'bold', color: 'black' }}
                    number={price}
                />
                <FilledButton
                    title='ادامه فرایند خرید'
                    style={[styles.button, { backgroundColor: selectedAddress.length === 0 ? 'gray' : '#4B8C2B' }]}
                    disabled={selectedAddress.length === 0}
                    textStyle={{ fontSize: WINDOW_WIDTH * 0.04, fontWeight: 'bold' }}
                    onPress={() => props.navigation.navigate('ShipmentScreen')}
                />
            </View>
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
        flex: 1,
        paddingVertical: 0
    },
    addToCart: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        width: WINDOW_WIDTH,
        height: WINDOW_WIDTH * 0.18,
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: 0.08,
        elevation: 2
    },
    button: {
        width: WINDOW_WIDTH * 0.5,
        height: WINDOW_WIDTH * 0.14,
        left: WINDOW_WIDTH * 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textAddress: {
        textAlign: 'right',
        fontSize: WINDOW_WIDTH * 0.043,
        fontWeight: 'bold'
    }
})
export default CheckOutScreen;