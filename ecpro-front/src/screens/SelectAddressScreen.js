import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useIsFocused } from '@react-navigation/native';

import { AddressRadioCard, TouchableButton } from '../components';
import { _deleteAddress, getAddress, _setSelectedAddress } from '../actions/OrderActions';
const WINDOW_WIDTH = Dimensions.get('window').width;

const SelectAddressScreen = (props) => {
    useEffect(() => {
        const loadAddresses = () => {
            dispatch(getAddress());
        }
        loadAddresses();
    }, [dispatch, isFocused])
    const dispatch = useDispatch();
    const addresses = useSelector(state => state.order.addresses)
    const selectedAddress = useSelector(state => state.order.selectedAddress);
    const isFocused = useIsFocused();
    const count = useSelector(state => state.order.count)
    const [selected, setSelected] = useState(selectedAddress.id);

    renderFooter = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e2e2e2', height: WINDOW_WIDTH * 0.2 }}>
                <TouchableButton
                    title="افزودن آدرس جدید"
                    containerStyle={{ top: -5, paddingLeft: 5 }}
                    rightIcon
                    rightIconName="add-location"
                    onPress={() => props.navigation.navigate('AddAddressScreen')}
                />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <FlatList
                data={addresses}
                extraData={count}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={20}
                ListFooterComponent={renderFooter()}
                windowSize={20}
                bounces={false}
                renderItem={({ item, index, separators }) => (
                    <AddressRadioCard
                        address={item}
                        deleteOnPress={() => {
                            if (item.id === selected) {
                                alert('آدرس انتخاب شده نمیتواند حذف شود')
                            }
                            dispatch(_deleteAddress(item.id))
                        }}
                        onPress={() => setSelected(item.id)}
                        selected={selected === item.id ? true : false}
                    />
                )}
            />
            <View style={styles.addComment}>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                    onPress={async () => {
                        await dispatch(_setSelectedAddress(selected))
                        props.navigation.goBack();
                    }}
                >
                    <AntDesign name='check' color='white' size={WINDOW_WIDTH * 0.07} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addComment: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        bottom: 20,
        left: 20,
        position: 'absolute',
        width: WINDOW_WIDTH * 0.16,
        height: WINDOW_WIDTH * 0.16,
        borderRadius: 30,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {},
        elevation: 2,
        backgroundColor: '#4B8C2B'
    }
});

export default SelectAddressScreen;