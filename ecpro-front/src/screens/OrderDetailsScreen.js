import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { API_BASE_URL } from '../common/Constants';
import { Price } from '../components';
const WINDOW_WIDTH = Dimensions.get('window').width;
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getOrderDetails } from '../actions/CrmActions';

const OrderDetailsScreen = (props) => {
    const { orderId } = props.route.params;
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const loading = useSelector(state => state.crm.Loading);
    const order = useSelector(state => state.crm.order);
    const address = useSelector(state => state.crm.address);
    console.log(order)
    useEffect(() => {
        const load = () => {
            dispatch(getOrderDetails(orderId));
        }
        load();
    }, [dispatch, isFocused])
    console.log(order)
    return (
        loading
            ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator
                    size='large'
                    color='#4B8C2B'
                />
            </View>
            :
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 45 }}>

                <View style={[styles.viewStyle, { padding: 10, marginBottom: 30 }]}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>مشخصات سفارش:</Text>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, { textAlign: 'left', }]}>{order.id}</Text>
                        <Text style={[styles.text, {}]}>آی دی:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{order.userId}</Text>
                        <Text style={[styles.text, {}]}>آی دی کاربر:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{order.trackingNumber}</Text>
                        <Text style={[styles.text, {}]}>کد پیگیری:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Price
                            containerStyle={{ justifyContent: 'center' }}
                            textStyle={{ color: 'black', textAlign: 'right' }}
                            number={order.amount}
                        />
                        <Text style={[styles.text, {}]}>مبلغ کل:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{order.createdAt}</Text>
                        <Text style={[styles.text, {}]}>تاریخ ثبت:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{order.updatedAt}</Text>
                        <Text style={[styles.text, {}]}>تاریخ بروزرسانی:</Text>
                    </View>
                    <View style={[styles.detailVewStyle, { borderTopWidth: 1, borderBottomWidth: 1, marginTop: 10, borderColor: '#e2e2e2' }]}>
                        <Text style={[styles.text, {}]}>{order.orderStatus === "processing" ? "در حال بررسی" : "ارسال شده"}</Text>
                        <Text style={[styles.text, {}]}>وضعیت سفارش:</Text>
                    </View>
                </View>

                <View style={[styles.viewStyle, { padding: 10, marginBottom: 30, marginTop: 0 }]}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>مشخصات آدرس:</Text>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, { textAlign: 'left', }]}>{address.id}</Text>
                        <Text style={[styles.text, {}]}>آی دی:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{address.firstName}</Text>
                        <Text style={[styles.text, {}]}>نام تحویل گیرنده:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{address.lastName}</Text>
                        <Text style={[styles.text, {}]}>نام خانوادگی تحویل گیرنده:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{address.phoneNumber}</Text>
                        <Text style={[styles.text, {}]}>شماره تلفن تحویل گیرنده:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{address.city}</Text>
                        <Text style={[styles.text, {}]}>شهر:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{address.address}</Text>
                        <Text style={[styles.text, {}]}>آدرس:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{address.zipCode}</Text>
                        <Text style={[styles.text, {}]}>کد پستی:</Text>
                    </View>
                </View>

                <View style={[styles.viewStyle, { padding: 10, marginBottom: 30, marginTop: 0 }]}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>سبد خرید:</Text>
                    <FlatList
                        data={order.orderItems}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        maxToRenderPerBatch={20}
                        windowSize={20}
                        bounces={false}
                        renderItem={({ item, index, separators }) => (
                            <View style={styles.productView}>
                                <Text style={{ textAlign: 'right', paddingRight: 10 }}>{item.qty}</Text>
                                <View style={{ flex: 1, height: WINDOW_WIDTH * 0.3, borderLeftWidth: 1, borderLeftColor: '#DEDEDE' }}>
                                    <Text style={{ textAlign: 'right', flex: 1 }}>{item.name}</Text>
                                    <Price
                                        containerStyle={{ justifyContent: 'flex-end', alignItems: 'flex-start', flex: 0.3, paddingHorizontal: 5 }}
                                        textStyle={{ color: 'black', textAlign: 'right' }}
                                        number={item.price}
                                    />
                                </View>
                                <Image
                                    source={{ uri: API_BASE_URL + `/${item.defaultPictureUrl.split("public/").pop()}` }}
                                    style={styles.imageStyle}
                                />
                            </View>
                        )}
                    />
                </View>

            </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        margin: 5
    },
    viewStyle: {
        backgroundColor: 'white',
        elevation: 2,
        marginTop: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 20
    },
    detailVewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: WINDOW_WIDTH * 0.95
    },
    button: {
        backgroundColor: '#171A40',
        marginTop: 30
    },
    productView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: WINDOW_WIDTH * 0.9,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE',
        paddingVertical: 10
    },
    imageStyle: {
        resizeMode: 'contain',
        height: WINDOW_WIDTH * 0.32,
        width: WINDOW_WIDTH * 0.32,
        top: WINDOW_WIDTH * 0.01,
        flex: 0.7
    }
});

export default OrderDetailsScreen;