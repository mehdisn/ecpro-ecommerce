import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'react-native-image-picker/src';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useIsFocused } from '@react-navigation/native'

import { Input, TextButton, FilledButton } from '../components';
import { addNewProduct, setPending, updateProduct, deleteProduct } from '../actions/CrmActions';
const SCREEN_WIDTH = Dimensions.get('window').width;

const AddProductScreen = (props) => {
    const focused = useIsFocused();
    useEffect(() => {
        const load = () => {
            editing ? setState({ name: name, price: price, stock: stock, manufacturer: manufacturer, description: description, images: [] })
                : setState({ name: '', price: '', stock: '', manufacturer: '', description: '', images: [] })
        }
        load()
    }, [focused]);
    const dispatch = useDispatch();
    const { categoryId, name, price, stock, manufacturer, description, editing, id } = props.route.params;
    let array = [];
    const loading = useSelector(state => state.crm.Loading)
    const [Editing, setEditing] = useState(editing)
    const [State, setState] = useState({
        name: '',
        price: '',
        stock: '',
        manufacturer: '',
        description: '',
        images: []
    });

    return (
        !loading
            ?
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ textAlign: 'right', fontWeight: 'bold', paddingBottom: 10 }}>مشخصات محصول را بنویسید</Text>

                <Input
                    value={State.name}
                    onChangeText={text => {
                        setState({ ...State, name: text })
                    }}
                    placeholder={'نام محصول'}
                    style={styles.input}
                />

                <Input
                    value={State.price}
                    onChangeText={text => {
                        setState({ ...State, price: text })
                    }}
                    placeholder={'قیمت محصول'}
                    style={styles.input}
                />

                <Input
                    value={State.stock}
                    onChangeText={text => {
                        setState({ ...State, stock: text })
                    }}
                    placeholder={'موجودی'}
                    style={styles.input}
                />

                <Input
                    value={State.manufacturer}
                    onChangeText={text => {
                        setState({ ...State, manufacturer: text })
                    }}
                    placeholder={'سازنده محصول'}
                    style={styles.input}
                />

                <Input
                    value={State.description}
                    multiLine={true}
                    numberOfLines={4}
                    onChangeText={text => {
                        setState({ ...State, description: text })
                    }}
                    style={{ height: SCREEN_WIDTH * 0.5, textAlign: 'right', top: 5, justifyContent: 'flex-start', marginBottom: 40 }}
                    placeholder={'توضیحات محصول'}
                />
                {
                    State.images
                        ?
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                            <FlatList
                                data={State.images}
                                extraData={State}
                                keyExtractor={item => item.uri}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index, separators }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', margin: 10 }}>
                                        <TouchableOpacity
                                            style={{ position: 'absolute', top: -5, left: -5, zIndex: 10 }}
                                            onPress={() => {
                                                array = [...State.images]
                                                array.splice(index, 1);
                                                setState({
                                                    ...State, images: array
                                                })
                                            }}
                                        >
                                            <AntDesign name="closecircle" size={17} color="red" />
                                        </TouchableOpacity>
                                        <Image
                                            source={{ uri: item.uri }}
                                            style={{ width: 100, height: 100, resizeMode: 'contain' }}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                        :
                        null
                }
                <View style={{ height: 50, alignItems: 'center' }}>
                    {
                        !editing ?
                            <TextButton
                                title="افزودن عکس جدید"
                                onPress={() => {
                                    ImagePicker.launchImageLibrary({
                                        mediaType: 'photo',
                                    }, async (response) => {
                                        array = [...State.images];
                                        array.push(response);
                                        setState({ ...State, images: array })
                                    })
                                }}
                            />
                            :
                            <TextButton
                                title="حذف محصول"
                                textStyle={{color: 'red'}}
                                onPress={() => {
                                    dispatch(setPending());
                                    dispatch(deleteProduct(id));
                                }}
                            />
                    }
                </View>

                <View style={{ paddingBottom: 40 }}>
                    <FilledButton
                        title={'ثبت محصول'}
                        containerStyle={{ top: 0, backgroundColor: !Boolean(State.name && State.price && State.stock && State.manufacturer && State.description) ? 'gray' : '#171A40' }}
                        disabled={!Boolean(State.name && State.price && State.stock && State.manufacturer && State.description)}
                        onPress={() => {
                            dispatch(setPending());
                            Editing
                                ?
                                dispatch(updateProduct({
                                    name: State.name,
                                    stock: State.stock,
                                    price: State.price,
                                    manufacturer: State.manufacturer,
                                    description: State.description,
                                    category: categoryId,
                                    id: id
                                }))
                                :
                                dispatch(addNewProduct({
                                    name: State.name,
                                    stock: State.stock,
                                    price: State.price,
                                    manufacturer: State.manufacturer,
                                    description: State.description,
                                    category: categoryId,
                                    productimage: State.images,
                                }))
                        }}
                    />
                </View>
            </ScrollView>
            :
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator
                    size="large"
                    color="black"
                />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 40
    },
    input: {
        marginVertical: 5
    }
})

export default AddProductScreen;