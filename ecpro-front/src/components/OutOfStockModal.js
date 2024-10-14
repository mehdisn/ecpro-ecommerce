import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, Modal, Image, FlatList, Dimensions } from 'react-native';
import { FilledButton } from './FilledButton'
const SCREEN_WIDTH = Dimensions.get('window').width;
import { Price } from './Price'

export function OutOfStockModal(props) {
    const outOfStock = useSelector(state => state.cart.outOfStock)
    const [Visible, setVisible] = useState(true);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={Visible}
        >
            <View
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: SCREEN_WIDTH * 0.97, height: SCREEN_WIDTH * 0.1, borderBottomColor: '#e2e2e2', borderBottomWidth: 1, paddingRight: 10, flex: 1 }}>
                            <Text style={{ textAlign: 'right', fontSize: 17, fontWeight: '500' }}>تغییر قیمت و موجودی {props.count} کالا</Text>
                        </View>
                        <View style={{ flex: 5, alignItems: 'flex-end', width: SCREEN_WIDTH * 0.97 }}>
                            <FlatList
                                data={props.ChangedProducts}
                                keyExtractor={item => item.id.toString()}
                                showsHorizontalScrollIndicator={false}
                                maxToRenderPerBatch={20}
                                windowSize={20}
                                bounces={false}
                                horizontal
                                renderItem={({ item, index, separators }) => (
                                    <View style={{ backgroundColor: 'white', width: 150, alignItems: 'center', justifyContent: 'flex-start' }}>
                                        {
                                            outOfStock.find(Product => Product.id === item.id) ?
                                                <Text style={{ color: '#E28F46' }}>اتمام موجودی</Text>
                                                :
                                                <Text style={{ color: '#E28F46' }}>تغییر قیمت</Text>
                                        }
                                        <Image
                                            source={{ uri: `http://localhost:3000/${item.defaultPictureUrl.split("public/").pop()}` }}
                                            style={{ resizeMode: 'contain', height: SCREEN_WIDTH * 0.32, width: SCREEN_WIDTH * 0.32, top: SCREEN_WIDTH * 0.01 }}
                                        />
                                        {
                                            outOfStock.find(Product => Product.id === item.id) ?
                                                null
                                                :
                                                <View style={{ flexDirection: 'row', top: SCREEN_WIDTH * 0.02 }}>
                                                    <Price
                                                        containerStyle={{ paddingRight: 10 }}
                                                        textStyle={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}
                                                        number={item.price}
                                                    />
                                                    <Text style={{ color: '#9A9A9A' }}>به</Text>
                                                </View>
                                        }
                                    </View>
                                )}
                            />
                            <View style={{ width: SCREEN_WIDTH * 0.9, alignItems: 'center' }}>
                                <FilledButton title='متوجه شدم' style={styles.button} textStyle={{ fontSize: SCREEN_WIDTH * 0.04, fontWeight: 'bold' }} onPress={() => setVisible(false)} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        height: SCREEN_WIDTH * 0.8,
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
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
    button: {
        backgroundColor: '#4B8C2B',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.7,
        height: SCREEN_WIDTH * 0.11,
        borderRadius: 10,
        top: SCREEN_WIDTH * 0.04
    }
});