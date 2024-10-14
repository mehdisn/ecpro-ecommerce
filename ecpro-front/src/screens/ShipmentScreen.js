import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
const persian = require('persian');
import { Price, FilledButton, ShipmentRadioCard, Input } from '../components';
import { _createOrder } from '../actions/OrderActions';
import { getShoppingCart } from '../actions/CartActions';

const WINDOW_WIDTH = Dimensions.get('window').width;

const Data = [{ method: 'پرداخت اینترنتی', text: 'پرداخت آنلاین با تمام کارت های بانکی', id: 1, disabled: true }, { method: 'پرداخت در محل', text: 'هنگام تحویل از طریق کارت های بانکی', id: 2, disabled: false }]

const ShipmentScreen = (props) => {
    const Dispatch = useDispatch();
    const [selected, setSelected] = useState(2);
    const [Code, setCode] = useState('');

    const listHeader = () => {
        return (
            <Text style={{ textAlign: 'right', fontWeight: '600', padding: 10, fontSize: 15 }}>شیوه پرداخت</Text>
        )
    }
    const count = useSelector(state => state.cart.itemsCount);
    const price = useSelector(state => state.cart.total);
    const selectedAddress = useSelector(state => state.order.selectedAddress);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.contentContainer} bounces={false}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-end', padding: 10, borderBottomWidth: 10, borderBottomColor: '#e2e2e2' }}>

                    <FlatList
                        data={Data}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader()}
                        bounces={false}
                        renderItem={({ item, index, separators }) => (
                            <ShipmentRadioCard
                                method={item.method}
                                Text={item.text}
                                onPress={() => setSelected(item.id)}
                                selected={selected === item.id ? true : false}
                                disabled={item.disabled}
                            />
                        )}
                    />
                </View>
                <View style={{ alignItems: 'flex-end', padding: 20, width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.5, borderBottomWidth: 10, borderBottomColor: '#e2e2e2' }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 6, justifyContent: 'space-between' }}>
                        <Text style={{ color: '#b1b1b1', textAlign: 'right', paddingRight: WINDOW_WIDTH * 0.59 }}>{persian.toPersian(count)} کالا</Text>
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
                <View style={{ alignItems: 'flex-end', padding: 20, width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.5, borderBottomWidth: 10, borderBottomColor: '#e2e2e2' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>کد تخفیف</Text>
                    <View style={styles.input}>
                        <TouchableOpacity
                            style={{ width: WINDOW_WIDTH * 0.08, height: WINDOW_WIDTH * 0.08, alignItems: 'center', justifyContent: 'center' }}
                            disabled={Code.length === 0 ? true : false}
                        >
                            <Feather name='plus' size={25} color={Code.length === 0 ? 'gray' : 'black'} />
                        </TouchableOpacity>
                        <Input
                            value={Code}
                            onChangeText={text => setCode(text)}
                            style={{ backgroundColor: 'transparent', textAlign: 'right' }}
                            placeholder={'افزودن کد تخفیف'}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.addToCart}>
                <Price
                    textStyle={{ fontSize: WINDOW_WIDTH * 0.046, fontWeight: 'bold', color: 'black' }}
                    number={price}
                />
                <FilledButton
                    title='تکمیل و پرداخت'
                    style={styles.button}
                    textStyle={{ fontSize: WINDOW_WIDTH * 0.04, fontWeight: 'bold' }}
                    onPress={() => {
                        Dispatch(_createOrder({ addressId: selectedAddress.id, navigation: props.navigation }));
                        Dispatch(getShoppingCart());

                    }}
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
        backgroundColor: '#4B8C2B',
        justifyContent: 'center',
        alignItems: 'center'
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
})
export default ShipmentScreen;