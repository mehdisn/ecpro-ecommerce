import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'react-native-image-picker/src';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'
import Dialog, {
    DialogTitle,
    DialogContent,
} from 'react-native-popup-dialog';
import { Input, TextButton, FilledButton } from '../components';
import { addNewCategory, setPending, UpdateCategory, deleteCategory } from '../actions/CrmActions';
const WINDOW_WIDTH = Dimensions.get('window').width;

const CategoryCrmScreen = (props) => {
    const focused = useIsFocused();
    useEffect(() => {
        const load = () => {
            editing ? setState({ name: name, image: { uri: image }, defaultAnimationDialog: false })
                : setState({ name: '', image: {}, defaultAnimationDialog: false })
        }
        load();
    }, [focused]);
    const dispatch = useDispatch();
    const { categoryId, name, image, editing } = props.route.params;
    const loading = useSelector(state => state.crm.Loading)
    const [Editing, setEditing] = useState(editing)
    const [State, setState] = useState({
        name: '',
        image: {},
        defaultAnimationDialog: false,
    });
    return (
        !loading
            ?
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ textAlign: 'right', fontWeight: 'bold', paddingBottom: 10 }}>مشخصات دسته را وارد کنید</Text>

                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                    <Image
                        source={State.image.uri ? { uri: State.image.uri } : require('../assets/images/no-image.jpg')}
                        style={{ width: 150, height: 150, resizeMode: 'contain' }}
                    />
                </View>

                <TextButton
                    title="افزودن عکس"
                    onPress={() => {
                        ImagePicker.launchImageLibrary({
                            mediaType: 'photo',
                        }, async (response) => {
                            setState({ ...State, image: response })
                        })
                    }}
                />

                <Input
                    value={State.name}
                    onChangeText={text => {
                        setState({ ...State, name: text })
                    }}
                    placeholder={'نام دسته'}
                    style={styles.input}
                />

                <View style={{ alignItems: 'center' }}>
                    {
                        editing ?
                            <TextButton
                                title="حذف دسته"
                                textStyle={{ color: 'red' }}
                                onPress={() => {
                                    setState({ ...State, defaultAnimationDialog: true });
                                }}
                            />
                            : null
                    }
                </View>

                <View style={{ paddingBottom: 40 }}>
                    <FilledButton
                        title={'ثبت دسته'}
                        containerStyle={{ top: 0, backgroundColor: !Boolean(State.name) ? 'gray' : '#171A40' }}
                        disabled={!Boolean(State.name)}
                        onPress={() => {
                            dispatch(setPending());
                            Editing
                                ?
                                dispatch(UpdateCategory({
                                    name: State.name,
                                    id: categoryId,
                                    image: State.image,
                                }))
                                :
                                dispatch(addNewCategory({
                                    name: State.name,
                                    parentId: categoryId,
                                    image: State.image,
                                }))
                        }}
                    />
                </View>
                <Dialog
                    onDismiss={() => {
                        setState({ ...State, defaultAnimationDialog: false });
                    }}
                    width={0.9}
                    rounded
                    visible={State.defaultAnimationDialog}
                    dialogTitle={
                        <DialogTitle
                            title="حذف دسته بندی"
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
                            <Text style={{ textAlign: 'center' }}>با حذف این دسته بندی تمام دسته ها و محصولات داخل آن از بین خواهند رفت</Text>
                            <Text style={{ textAlign: 'center' }}>آیا مطمعن هستید؟</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 10 }}>
                            <FilledButton
                                title="بله"
                                containerStyle={{ width: WINDOW_WIDTH * 0.3, height: 50, backgroundColor: 'red' }}
                                onPress={() => {
                                    setState({ ...State, defaultAnimationDialog: false })
                                    // dispatch(setPending());
                                    dispatch(deleteCategory(categoryId));
                                    props.navigation.navigate('CategoryScreen')
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
        marginVertical: 25
    }
})

export default CategoryCrmScreen;