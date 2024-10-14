import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { signOut } from '../actions/AuthActions';
const WINDOW_WIDTH = Dimensions.get('window').width;

const ProfileScreen = (props) => {
    AntDesign.loadFont();
    Ionicons.loadFont();
    FontAwesome.loadFont();
    const dispatch = useDispatch();
    const fullName = useSelector(state => state.auth.fullName);
    const phoneNumber = useSelector(state => state.auth.phoneNumber);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.infoContainer}>
                    <Text style={[{ fontWeight: "bold", fontSize: 26 }]}>{fullName}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{phoneNumber}</Text>
                </View>

                <View style={styles.navButtonsContainer}>
                    <TouchableOpacity style={styles.navButtons}>
                        <Ionicons name="ios-arrow-back" size={20} color="gray" />
                        <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7 }]}> لیست مورد علاقه </Text>
                        <AntDesign name="hearto" size={22} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButtons}>
                        <Ionicons name="ios-arrow-back" size={20} color="gray" />
                        <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7 }]}> نقد و نظرات </Text>
                        <FontAwesome name="comment-o" size={22} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButtons}>
                        <Ionicons name="ios-arrow-back" size={20} color="gray" />
                        <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7 }]}>پرسش های متداول</Text>
                        <AntDesign name="questioncircleo" size={23} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButtons}>
                        <Ionicons name="ios-arrow-back" size={20} color="gray" />
                        <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7 }]}>تماس با ما</Text>
                        <AntDesign name="phone" size={23} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.navButtons, { borderBottomWidth: 0, justifyContent: 'flex-end' }]}
                        onPress={async () => {
                            dispatch(signOut());
                        }}>
                        <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7, color: 'red', right: 15 }]}>خروج از حساب کاربری</Text>
                        <Ionicons name="exit-outline" size={23} color="red" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 10
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 20
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: WINDOW_WIDTH * 0.5,
        height: WINDOW_WIDTH * 0.5,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10,
        backgroundColor: 'black'
    },
    mediaCount: {
        backgroundColor: "#4B8C2B",
        position: "absolute",
        top: "50%",
        marginTop: -WINDOW_WIDTH * 0.12,
        marginLeft: WINDOW_WIDTH * 0.08,
        width: WINDOW_WIDTH * 0.2,
        height: WINDOW_WIDTH * 0.2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1,
        elevation: 2
    },
    navButtonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black'
    },
    navButtons: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: WINDOW_WIDTH * 0.9,
        height: WINDOW_WIDTH * 0.14,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e2e2",
        // backgroundColor: "black"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
    }
});

export default ProfileScreen;