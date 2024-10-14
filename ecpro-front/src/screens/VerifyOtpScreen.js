import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, Modal, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountDown from 'react-native-countdown-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { resetCodeSent, signUp, otpGen } from '../actions/AuthActions';
import { TextButton, ErrorModal, FilledButton } from '../components';
const SCREEN_WIDTH = Dimensions.get('window').width;

const VerifyOtpScreen = () => {
    const [ShowButton, setShowButton,] = useState(false);
    const [CodeText, setCodeText] = useState('');
    const codeSent = useSelector(state => state.auth.codeSent);
    const FullName = useSelector(state => state.auth.fullName);
    const PhoneNumber = useSelector(state => state.auth.phoneNumber);
    const Email = useSelector(state => state.auth.email);
    const Password = useSelector(state => state.auth.password);
    const Secret = useSelector(state => state.auth.secret);
    const error = useSelector(state => state.auth.error_message);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    AntDesign.loadFont();

    const resendButton = () => {
        dispatch(otpGen({ fullName: FullName, email: Email, password: Password, phoneNumber: PhoneNumber }));
        setShowButton(false);
        setCodeText('');
    }

    const fulFill = () => {
        console.log('fulfill')
        dispatch(signUp({ fullName: FullName, email: Email, password: Password, PhoneNumber: PhoneNumber, navigation: navigation, token: CodeText, secret: Secret }))
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={codeSent}
        >
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
                enabled
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowButton(false);
                                dispatch(resetCodeSent());
                                setCodeText('')
                            }}
                            style={{ alignItems: 'flex-end', width: SCREEN_WIDTH, paddingHorizontal: SCREEN_WIDTH * 0.04, top: -SCREEN_WIDTH * 0.03 }}
                        >
                            <AntDesign name="closecircleo" size={24} color="black" style={{}} />
                        </TouchableOpacity>
                        <Text style={styles.title}>تایید شماره تلفن</Text>
                        <Text style={styles.text}>کد تایید ارسال شده به {PhoneNumber} را در کادر وارد کنید</Text>
                        <CodeField
                            value={CodeText}
                            onChangeText={setCodeText}
                            cellCount={6}
                            rootStyle={styles.codeFiledRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                    key={index}
                                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                                    <Text style={styles.cellText}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                </View>
                            )}
                        />
                        <FilledButton
                            title={'ایجاد حساب کاربری'}
                            containerStyle={styles.filledButton}
                            onPress={() => fulFill()}
                        />
                        {ShowButton ? (
                            <>
                                <TextButton
                                    title={'ارسال مجدد کد'}
                                    style={{
                                        top: SCREEN_WIDTH * 0.06
                                    }}
                                    onPress={() => resendButton()}
                                />
                            </>
                        ) : (
                                <CountDown
                                    onFinish={() => setShowButton(true)}
                                    until={120}
                                    size={15}
                                    separatorStyle={{ color: 'black', top: SCREEN_WIDTH * 0.03 }}
                                    digitStyle={{ backgroundColor: '#FFF', top: SCREEN_WIDTH * 0.035 }}
                                    digitTxtStyle={{ color: 'black' }}
                                    timeToShow={['M', 'S']}
                                    showSeparator
                                    timeLabels={{ m: '', s: '' }}
                                />
                            )
                        }

                        {error != '' ? (
                            <>
                                <ErrorModal
                                    error={error}
                                />
                            </>
                        ) : (
                                null
                            )
                        }


                    </View>
                </View>
            </KeyboardAvoidingView>
            <Image
                source={require("../assets/images/icons8-keepass-64.png")}
                style={styles.image}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        height: SCREEN_WIDTH * 0.89,
        top: SCREEN_WIDTH * 0.21,
    },
    title: {
        fontWeight: '600',
        fontSize: SCREEN_WIDTH * 0.051,
        paddingTop: -0,
    },
    text: {
        padding: 10,
        textAlign: 'right'
    },
    modalView: {
        margin: 3,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "black",
    },
    image: {
        bottom: SCREEN_WIDTH * 0.75,
        left: SCREEN_WIDTH * 0.44,
    },
    cellRoot: {
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_WIDTH * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },
    codeFiledRoot: {
        marginTop: SCREEN_WIDTH * 0.01,
        width: SCREEN_WIDTH * 0.75,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    filledButton: {
        marginTop: SCREEN_WIDTH * 0.05,
        borderRadius: 30
    }
});

export default VerifyOtpScreen