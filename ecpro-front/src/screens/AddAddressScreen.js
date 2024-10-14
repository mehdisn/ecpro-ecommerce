import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, FilledButton } from '../components';
import { _addAddress, _getSelectedAddress } from '../actions/OrderActions';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const AddAddressScreen = (props) => {
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [ZipCode, setZipCode] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    return (
        <View style={{ padding: 20 }}>
            <View style={{ height: SCREEN_HEIGHT * 0.68 }}>
                <Text style={{ textAlign: 'right', fontWeight: 'bold', paddingBottom: 10 }}>جزيیات آدرس خود را بنویسید</Text>
                <Input
                    value={City}
                    onChangeText={text => {
                        setCity(text)
                    }}
                    placeholder={'شهر'}
                    style={styles.input}
                />

                <Input
                    value={Address}
                    multiLine={true}
                    onChangeText={text => {
                        setAddress(text)
                    }}
                    style={styles.input}
                    placeholder={'آدرس پستی'}
                />

                <Input
                    value={ZipCode}
                    onChangeText={text => {
                        setZipCode(text)
                    }}
                    style={styles.input}
                    placeholder={'کد پستی'}
                />

                <Input
                    value={FirstName}
                    onChangeText={text => {
                        setFirstName(text)
                    }}
                    style={styles.input}
                    placeholder={'نام گیرنده'}
                />

                <Input
                    value={LastName}
                    onChangeText={text => {
                        setLastName(text)
                    }}
                    style={styles.input}
                    placeholder={'نام خانوادگی گیرنده'}
                />

                <Input
                    value={PhoneNumber}
                    onChangeText={text => {
                        setPhoneNumber(text)
                    }}
                    style={styles.input}
                    placeholder={'شماره تلفن همراه گیرنده'}
                />
            </View>

            <View style={{ top: 50 }}>
                <FilledButton
                    title={'ثبت آدرس'}
                    containerStyle={{ top: 0, backgroundColor: !Boolean(Address && FirstName && LastName && PhoneNumber && City && ZipCode) ? 'gray' : '#171A40' }}
                    disabled={!Boolean(Address && FirstName && LastName && PhoneNumber && City && ZipCode)}
                    onPress={async () => {
                        await dispatch(_addAddress({ address: Address, city: City, zipCode: ZipCode, firstName: FirstName, lastName: LastName, phoneNumber: PhoneNumber }));
                        await dispatch(_getSelectedAddress());
                        props.navigation.goBack();
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
        textAlign: 'right',
        top: 5
    },
});

export default AddAddressScreen;
