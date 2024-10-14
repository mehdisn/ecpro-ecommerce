import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input, FilledButton } from '../components';
const WINDOW_WIDTH = Dimensions.get('window').width;
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'
import { getAdminUsers, getUsers, setPending } from '../actions/CrmActions';

const UsersCrmScreen = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const admins = useSelector(state => state.crm.admin_users);
    const users = useSelector(state => state.crm.users);
    const loading = useSelector(state => state.crm.Loading);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        const load = () => {
            dispatch(setPending());
            dispatch(getAdminUsers());
        }
        load();
    }, [dispatch, isFocused])
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
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>ادمین ها:</Text>
                    <FlatList
                        data={admins}
                        keyExtractor={item => item.id.toString()}
                        style={{}}
                        scrollEnabled={false}
                        renderItem={({ item, index, separators }) => (
                            <TouchableOpacity
                                style={styles.touchableStyle}
                                onPress={() => {
                                    props.navigation.navigate('UserDetailsScreen', {
                                        user: item
                                    })
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={[styles.text, { width: WINDOW_WIDTH * 0.1 }]}>{item.id}</Text>
                                <Text
                                    numberOfLines={1}
                                    style={[styles.text, {}]}>{item.phoneNumber}</Text>
                                <Text
                                    numberOfLines={1}
                                    style={[styles.text, { width: WINDOW_WIDTH * 0.3 }]}>{item.Email}</Text>
                                <Text
                                    numberOfLines={1}
                                    style={[styles.text, { width: WINDOW_WIDTH * 0.22 }]}>{item.fullName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>


                <View style={[styles.viewStyle, { padding: 10, marginBottom: 30 }]}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>جست و جو در بین تمام کاربران:</Text>
                    <View>
                        <Text style={[styles.text, { fontSize: WINDOW_WIDTH * 0.032, textAlign: 'right' }]}>جست و جو میتواند بر اساس شماره موبایل یا پست الکترونیک باشد.</Text>
                        <Text style={[styles.text, { fontSize: WINDOW_WIDTH * 0.032, textAlign: 'right' }]}>لطفا یکی از مقادیر زیر را وارد نمایید.</Text>
                    </View>
                    <Input
                        style={styles.input}
                        placeholder={'شماره موبایل'}
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                    <Input
                        style={styles.input}
                        placeholder={'پست الکترونیک'}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <FilledButton
                        title={'جست و جو'}
                        containerStyle={[styles.loginButton, { backgroundColor: !Boolean(phoneNumber || email) ? 'gray' : '#171A40' }]}
                        disabled={!Boolean(phoneNumber || email)}
                        onPress={() => {
                            dispatch(setPending());
                            dispatch(getUsers(email, phoneNumber));
                        }}
                    />
                </View>
                {
                    !users || users.length === 0
                        ?
                        null
                        :
                        <View style={[styles.viewStyle, { marginTop: 0, marginBottom: 30 }]}>
                            <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>نتایج جست و جو:</Text>
                            <FlatList
                                data={users}
                                keyExtractor={item => item.id.toString()}
                                style={{}}
                                scrollEnabled={false}
                                renderItem={({ item, index, separators }) => (
                                    <TouchableOpacity
                                        style={styles.touchableStyle}
                                        onPress={() => {
                                            props.navigation.navigate('UserDetailsScreen', {
                                                user: item
                                            })
                                        }}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            style={[styles.text, { width: WINDOW_WIDTH * 0.1 }]}>{item.id}</Text>
                                        <Text
                                            numberOfLines={1}
                                            style={[styles.text, {}]}>{item.phoneNumber}</Text>
                                        <Text
                                            numberOfLines={1}
                                            style={[styles.text, { width: WINDOW_WIDTH * 0.3 }]}>{item.Email}</Text>
                                        <Text
                                            numberOfLines={1}
                                            style={[styles.text, { width: WINDOW_WIDTH * 0.22 }]}>{item.fullName}</Text>
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

export default UsersCrmScreen;