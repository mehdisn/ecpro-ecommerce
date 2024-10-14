import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { API_BASE_URL } from '../common/Constants';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import FastImage from 'react-native-fast-image'
import { RatingStars } from './RatingStars'
import { Price } from './Price'
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height
function ProductCard(props) {
    Octicons.loadFont()
    const [Disable, setDisable] = useState(false)

    useEffect(() => {
        props.shoppingCart ? setDisable(true) : setDisable(false)
    })
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}
            disabled={Disable}
            {...props}
        >
            <View style={{ flex: 3, justifyContent: 'flex-start' }} >
                <Text style={styles.text}>{props.title}</Text>
                <View style={{}}>
                    {
                        props.shoppingCart ?
                            <View style={{ borderWidth: 1, borderColor: '#dfdfdf', width: WINDOW_WIDTH * 0.3, height: WINDOW_WIDTH * 0.12, borderRadius: 6, top: 30, padding: 10, flexDirection: 'row', alignItems: 'center', position: 'absolute' }}>
                                {
                                    props.qty > 1 ?
                                        <TouchableOpacity style={{ flex: 2 }} onPress={() => props.decButton()}>
                                            <AntDesign name="minus" size={24} color='#171A40' />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{ flex: 2 }} onPress={() => props.trashButton()}>
                                            <Octicons name="trashcan" size={24} color='#171A40' />
                                        </TouchableOpacity>

                                }
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 20, textAlign: 'left', right: 5 }}>{props.qty}</Text>
                                </View>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => props.addButton()}>
                                    <AntDesign name="plus" size={24} color='#171A40' />
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }
                    <Price
                        containerStyle={{ position: 'absolute', top: 90, width: WINDOW_WIDTH * 0.3, height: 50, alignItems: 'center', justifyContent: 'center', }}
                        textStyle={{ fontSize: WINDOW_WIDTH * 0.04, fontWeight: 'bold', color: 'red' }}
                        number={props.price}
                    />
                </View>
            </View>
            <View style={{ flex: 2 }}>
                {
                    props.shoppingCart
                        ?
                        <TouchableOpacity style={{ flex: 1 }} onPress={props.onPress}>
                            <FastImage
                                style={styles.image}
                                source={{
                                    uri: API_BASE_URL + `/${props.image}`,
                                    cache: FastImage.cacheControl.immutable
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                        :
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: API_BASE_URL + `/${props.image}`,
                                cache: FastImage.cacheControl.immutable
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT * 0.3,
        // backgroundColor: 'black',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dfdfdf'
    },
    text: {
        textAlign: 'right',
        right: 10
    },
    image: {
        flex: 1,
        width: WINDOW_WIDTH * 0.4
    }

});

export default React.memo(ProductCard);