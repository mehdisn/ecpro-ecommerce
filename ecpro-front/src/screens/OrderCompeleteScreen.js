import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
const persian = require('persian');
import { Price, FilledButton, ShipmentRadioCard, Input } from '../components';
import {
    _getSelectedAddress,
    _createOrder
} from '../actions/OrderActions';

const WINDOW_WIDTH = Dimensions.get('window').width;

const OrderCompeleteScreen = (props) => {
    const price = useSelector(state => state.cart.total);
    const order = useSelector(state => state.order.order);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.contentContainer} bounces={false}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/images/m11.jpg')} style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH }} />
                </View>
                <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', padding: 10, borderBottomWidth: 10, borderBottomColor: '#e2e2e2', marginTop: -WINDOW_WIDTH * 0.09, height: WINDOW_WIDTH * 0.35 }}>
                    <Text style={{ textAlign: 'center', fontSize: WINDOW_WIDTH * 0.05, fontWeight: 'bold', paddingVertical: 5 }}>مشتری گرامی</Text>
                    <Text style={{ textAlign: 'center', fontSize: WINDOW_WIDTH * 0.039, fontWeight: '500' }}>ضمن تشکر از خرید شما. سفارش شما با
                    مشخصات زیر ثبت شد.
                    همکاران ما به زودی با شما تماس خواهند گرفت.
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end', padding: 20, width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.65, borderBottomWidth: 10, borderBottomColor: '#e2e2e2', marginBottom: WINDOW_WIDTH * 0.15 }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 6, justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>جزیات سفارش</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={{ fontWeight: 'bold' }}>{order.trackingNumber}</Text>
                        <Text style={{ color: 'gray', }}>کد پیگیری: </Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Price
                            textStyle={{ color: 'black', fontWeight: 'bold' }}
                            number={price}
                        />
                        <Text style={{ color: 'gray', }}>مبلغ کل کالاها: </Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={{ fontWeight: 'bold' }}>رایگان</Text>
                        <Text style={{ color: 'gray', }}>هزینه ارسال: </Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Price
                            textStyle={{ color: 'black', fontWeight: 'bold' }}
                            number={price}
                        />
                        <Text style={{ color: 'gray', }}>جمع کل: </Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={{ fontWeight: 'bold' }}>پرداخت در محل</Text>
                        <Text style={{ color: 'gray', }}>وضعیت پرداخت: </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.addToCart}>
                <FilledButton
                    title='بازگشت به صفحه ی اصلی'
                    style={styles.button}
                    textStyle={{ fontSize: WINDOW_WIDTH * 0.04, fontWeight: 'bold' }}
                    onPress={() => props.navigation.navigate('HomeScreen')}
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
        width: '100%',
        height: WINDOW_WIDTH * 0.14,
        backgroundColor: '#4B8C2B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textAddress: {
        textAlign: 'right',
        fontSize: WINDOW_WIDTH * 0.043,
        fontWeight: 'bold'
    },
    input: {
        marginVertical: 8,
        backgroundColor: 'gray',
        top: 5,
        width: WINDOW_WIDTH * 0.9,
        height: WINDOW_WIDTH * 0.12,
        backgroundColor: '#e8e8e8',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    detailsView: {
        flexDirection: 'row',
        paddingVertical: 7,
        width: WINDOW_WIDTH * 0.9,
        justifyContent: 'space-between'
    }
})
export default OrderCompeleteScreen;