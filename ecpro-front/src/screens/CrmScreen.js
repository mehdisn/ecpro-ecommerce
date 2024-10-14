import React, { useEffect } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Price } from '../components';
import { data } from '../common/data'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import persian from 'persian';
import { getNewOrders, setPending } from '../actions/CrmActions';
import { useIsFocused } from '@react-navigation/native';
import {
    LineChart
} from 'react-native-chart-kit';

const WINDOW_WIDTH = Dimensions.get('window').width;

const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: '#171A40',
    backgroundGradientTo: '#171A40',
    propsForLabels: {
        fontSize: 10
    },
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
}

const CrmScreen = (props) => {
    useEffect(() => {
        const load = () => {
            dispatch(setPending());
            dispatch(getNewOrders());
        }
        load();
    }, [dispatch, isFocused])
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const count = useSelector(state => state.crm.order_count);
    const loading = useSelector(state => state.crm.Loading);
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
            <ScrollView
                style={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <LineChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={200}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.graphStyle}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 13 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', width: 200, height: 100, borderRadius: 10, elevation: 2 }}>
                        <Text style={{ color: 'white' }}>درآمد امروز</Text>
                        <Price
                            number={2500000}
                            textStyle={{ color: 'white' }}
                        />
                    </View>
                    <View style={{ borderTopWidth: 1, borderTopColor: "#c2c2c2", marginTop: 20, paddingBottom: 80 }}>
                        <TouchableOpacity
                            style={styles.navButtons}
                            onPress={() => props.navigation.navigate("OrderCrmScreen")}
                        >
                            <Ionicons name="ios-arrow-back" size={20} color="gray" />
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: WINDOW_WIDTH * 0.71, justifyContent: 'flex-end' }}>
                                <Text style={[{ fontSize: 11, textAlign: 'right', color: 'red' }]}> ({persian.toPersian(count)} سفارش جدید) </Text>
                                <Text style={[{ fontSize: 17, textAlign: 'right' }]}> سفارشات </Text>
                            </View>
                            <AntDesign name="shoppingcart" size={22} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.navButtons}
                            onPress={() => props.navigation.navigate('HomeCrmScreen')}
                        >
                            <Ionicons name="ios-arrow-back" size={20} color="gray" />
                            <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7 }]}> صفحه اصلی </Text>
                            <AntDesign name="home" size={22} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.navButtons}
                            onPress={() => props.navigation.navigate('Category', { screen: "CategoryScreen" })}
                        >
                            <Ionicons name="ios-arrow-back" size={20} color="gray" />
                            <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7 }]}> افزودن محصول </Text>
                            <AntDesign name="plus" size={22} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.navButtons}
                            onPress={() => props.navigation.navigate('Category', { screen: "CategoryScreen" })}
                        >
                            <Ionicons name="ios-arrow-back" size={20} color="gray" />
                            <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7 }]}> دسته بندی ها </Text>
                            <AntDesign name="appstore-o" size={22} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.navButtons}
                            onPress={() => {
                                props.navigation.navigate('UsersCrmScreen')
                            }}
                        >
                            <Ionicons name="ios-arrow-back" size={20} color="gray" />
                            <Text style={[{ fontSize: 17, textAlign: 'right', width: WINDOW_WIDTH * 0.7 }]}> کاربران </Text>
                            <FontAwesome5 name="users" size={22} color="black" />
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    graphStyle: {
        marginVertical: 8,
        ...chartConfig.style
    },
    navButtons: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: WINDOW_WIDTH * 0.9,
        height: WINDOW_WIDTH * 0.12,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e2e2",
    },
})

export default CrmScreen;