import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FilledButton } from '../components';
import { Picker } from '@react-native-community/picker'
const WINDOW_WIDTH = Dimensions.get('window').width;
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Dialog, {
    DialogTitle,
    DialogContent,
} from 'react-native-popup-dialog';
import { updateUserRole } from '../actions/CrmActions';

const UserDetailsScreen = (props) => {
    const { user } = props.route.params;
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const loading = useSelector(state => state.crm.Loading);
    const [selectedValue, setSelectedValue] = useState("");
    const [ShowButton, setShowButton] = useState(false);
    const [State, setState] = useState({
        defaultAnimationDialog: false
    });
    console.log(user.roles)
    useEffect(() => {
        const load = () => {
            user.roles.map((role) => {
                if (role.name === "admin") {
                    setSelectedValue("admin")
                } else {
                    setSelectedValue("user")
                }
            })
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

                <View style={[styles.viewStyle, { padding: 10, marginBottom: 30 }]}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18, color: 'black' }]}>مشخصات کاربر:</Text>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, { textAlign: 'left', }]}>{user.id}</Text>
                        <Text style={[styles.text, {}]}>آی دی:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{user.fullName}</Text>
                        <Text style={[styles.text, {}]}>نام کامل:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{user.phoneNumber}</Text>
                        <Text style={[styles.text, {}]}>شماره موبایل:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{user.Email}</Text>
                        <Text style={[styles.text, {}]}>ایمیل:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{user.createdAt}</Text>
                        <Text style={[styles.text, {}]}>تاریخ عضویت:</Text>
                    </View>
                    <View style={styles.detailVewStyle}>
                        <Text style={[styles.text, {}]}>{user.updatedAt}</Text>
                        <Text style={[styles.text, {}]}>تاریخ بروزرسانی:</Text>
                    </View>
                    <View style={[styles.detailVewStyle, { borderTopWidth: 1, borderBottomWidth: 1, marginTop: 10, borderColor: '#e2e2e2' }]}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedValue(itemValue);
                                user.roles.map((role) => {
                                    role.name != selectedValue ? setShowButton(true) : setShowButton(false);
                                })
                            }}
                        >
                            <Picker.Item label="User" value="user" />
                            <Picker.Item label="Admin" value="admin" />
                        </Picker>
                        <Text style={[styles.text, {}]}>نقش کاربر:</Text>
                    </View>
                    {
                        !ShowButton
                            ?
                            null
                            :
                            <FilledButton
                                title={'آپدیت'}
                                containerStyle={styles.button}
                                onPress={() => {
                                    setState({ ...State, defaultAnimationDialog: true });
                                }}
                            />
                    }

                    <Dialog
                        onDismiss={() => {
                            setState({ ...State, defaultAnimationDialog: false });
                        }}
                        width={0.9}
                        rounded
                        visible={State.defaultAnimationDialog}
                        dialogTitle={
                            <DialogTitle
                                title="تغییر نقش کاربر"
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
                                <Text style={{ textAlign: 'center' }}>با تغییر نقش کاربر سطح دسترسی این کاربر به محتوای این نرم افزار تغییر میکند</Text>
                                <Text style={{ textAlign: 'center' }}>آیا مطمعن هستید؟</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 10 }}>
                                <FilledButton
                                    title="بله"
                                    containerStyle={{ width: WINDOW_WIDTH * 0.3, height: 50, backgroundColor: 'red' }}
                                    onPress={() => {
                                        setState({ ...State, defaultAnimationDialog: false })
                                        dispatch(updateUserRole(selectedValue === "admin" ? ["admin", "user"] : "user", user.id))
                                        props.navigation.goBack()
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
    }
});

export default UserDetailsScreen;