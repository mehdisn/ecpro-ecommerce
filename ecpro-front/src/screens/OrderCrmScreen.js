import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'
import Dialog, {
    DialogTitle,
    DialogContent,
} from 'react-native-popup-dialog';

import { Input, FilledButton, Price } from '../components';
import { setPending, getAllOrders, ChangeOrderStatus, getNewOrders } from '../actions/CrmActions';
const WINDOW_WIDTH = Dimensions.get('window').width;

const OrderCrmScreen = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const newOrders = useSelector(state => state.crm.new_orders);
    const orders = useSelector(state => state.crm.orders);
    const loading = useSelector(state => state.crm.Loading);
    const [State, setState] = useState({
        defaultAnimationDialog: false,
        selected: ''
    });
    const [trackingCode, setTrackingCode] = useState('');
    useEffect(() => {
        const load = () => {
            dispatch(getNewOrders());
        }
        load();
    }, [dispatch, isFocused, State.defaultAnimationDialog])
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
                <View style={styles.viewStyle}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>سفارشات جدید:</Text>
                    <FlatList
                        data={newOrders}
                        keyExtractor={item => item.id.toString()}
                        style={{}}
                        scrollEnabled={false}
                        renderItem={({ item, index, separators }) => (
                            <TouchableOpacity
                                style={styles.touchableStyle}
                                onPress={() => {
                                    props.navigation.navigate('OrderDetailsScreen', {
                                        orderId: item.id
                                    })
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={[styles.text, { width: WINDOW_WIDTH * 0.1, flex: 1 }]}>{item.id}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 10, paddingRight: 10 }}>
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.text, {}]}>{item.trackingNumber}</Text>
                                    <Price
                                        containerStyle={{ justifyContent: 'center' }}
                                        textStyle={{ fontSize: WINDOW_WIDTH * 0.035, fontWeight: 'bold', color: 'black', textAlign: 'right' }}
                                        number={item.amount}
                                    />
                                </View>
                                <FilledButton
                                    logo
                                    logoName="checkcircle"
                                    logoColor="#171A40"
                                    style={{ flex: 1, paddingLeft: 10, borderLeftWidth: 1 }}
                                    onPress={() => {
                                        setState({ ...State, defaultAnimationDialog: true, selected: item.id });
                                    }}
                                />

                            </TouchableOpacity>
                        )}
                    />
                    <Dialog
                        onDismiss={() => {
                            setState({ ...State, defaultAnimationDialog: false });
                        }}
                        width={0.9}
                        rounded
                        visible={State.defaultAnimationDialog}
                        dialogTitle={
                            <DialogTitle
                                title="تغییر وضعیت سفارش"
                                style={{
                                    backgroundColor: '#F7F7F8',
                                    textAlign: 'right',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                hasTitleBar={false}
                                align="right"
                            />
                        }
                    >
                        <DialogContent
                            style={{
                                backgroundColor: '#F7F7F8',
                            }}
                        >
                            <View style={{ top: -10 }}>
                                <Text style={{ textAlign: 'center' }}>با انتخاب این گزینه وضعیت این سفارش از "در حال بررسی" به "ارسال شده" تغییر میکند.</Text>
                                <Text style={{ textAlign: 'center' }}>آیا مطمعن هستید؟</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 10 }}>
                                <FilledButton
                                    title="بله"
                                    containerStyle={{ width: WINDOW_WIDTH * 0.3, height: 50, backgroundColor: 'red' }}
                                    onPress={async () => {
                                        await dispatch(ChangeOrderStatus(State.selected));
                                        setState({ ...State, defaultAnimationDialog: false });
                                        // dispatch(getNewOrders());
                                    }}
                                />
                                <FilledButton
                                    title="خیر"
                                    containerStyle={{ width: WINDOW_WIDTH * 0.3, height: 50 }}
                                    onPress={() => {
                                        setState({ ...State, defaultAnimationDialog: false })
                                    }}
                                />
                            </View>
                        </DialogContent>
                    </Dialog>
                </View>


                <View style={[styles.viewStyle, { padding: 10, marginBottom: 30 }]}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>جست و جو با استفاده از کد پیگیری:</Text>
                    <View>
                        <Text style={[styles.text, { fontSize: WINDOW_WIDTH * 0.032, textAlign: 'right' }]}>با استفاده از کد پیگیری میتوانید سفارش مد نظر خود را در بین تمام سفارشات پیدا کنید.</Text>
                    </View>
                    <Input
                        style={styles.input}
                        placeholder={'کد پیگیری'}
                        value={trackingCode}
                        onChangeText={text => setTrackingCode(text)}
                    />
                    <FilledButton
                        title={'جست و جو'}
                        containerStyle={[styles.loginButton, { backgroundColor: !Boolean(trackingCode) ? 'gray' : '#171A40' }]}
                        disabled={!Boolean(trackingCode)}
                        onPress={() => {
                            dispatch(setPending());
                            dispatch(getAllOrders(trackingCode));
                        }}
                    />
                </View>
                {
                    !orders || orders.length === 0
                        ?
                        null
                        :
                        <View style={[styles.viewStyle, { marginTop: 0, marginBottom: 30 }]}>
                            <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>نتایج جست و جو:</Text>
                            <FlatList
                                data={orders}
                                keyExtractor={item => item.id.toString()}
                                style={{}}
                                scrollEnabled={false}
                                renderItem={({ item, index, separators }) => (
                                    <TouchableOpacity
                                        style={styles.touchableStyle}
                                        onPress={() => {
                                            props.navigation.navigate('OrderDetailsScreen', {
                                                orderId: item.id
                                            })
                                        }}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            style={[styles.text, { width: WINDOW_WIDTH * 0.1, flex: 1 }]}>{item.id}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 10 }}>
                                            <Text
                                                numberOfLines={1}
                                                style={[styles.text, {}]}>{item.trackingNumber}</Text>
                                            <Price
                                                containerStyle={{ justifyContent: 'center' }}
                                                textStyle={{ fontSize: WINDOW_WIDTH * 0.035, fontWeight: 'bold', color: 'black', textAlign: 'right' }}
                                                number={item.amount}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                }

            </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        margin: 5
    },
    touchableStyle: {
        flexDirection: 'row',
        padding: 10,
        margin: 5,
        backgroundColor: '#E0E0E0',
        elevation: 2,
        width: WINDOW_WIDTH * 0.95
    },
    viewStyle: {
        backgroundColor: 'white',
        elevation: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    input: {
        marginVertical: 10,
        textAlign: 'right',
    },
    loginButton: {
        marginVertical: 10,
    }
});

export default OrderCrmScreen;