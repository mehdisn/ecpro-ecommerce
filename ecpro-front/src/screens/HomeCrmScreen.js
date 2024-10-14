import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker/src';

import { TextButton } from '../components';
import { API_BASE_URL } from '../common/Constants';
import { setHomeSliderImage, deleteHomeSliderImage } from '../actions/CrmActions';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HomeCrmScreen = (props) => {
    const sliderImages = useSelector(state => state.home.images);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const renderFooter = () => {
        return (
            <View style={[styles.componentView, { height: 80, alignItems: 'center' }]}>
                <TextButton
                    title="افزودن عکس جدید"
                    onPress={() => {
                        ImagePicker.launchImageLibrary({
                            mediaType: 'photo',
                        }, async (response) => {
                            setLoading(true);
                            dispatch(setHomeSliderImage({
                                uri: response.uri,
                                type: response.type,
                                name: response.fileName,
                            }));
                            setLoading(false);
                        })
                    }}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {
                loading
                    ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator
                            size='large'
                            color='#4B8C2B'
                        />
                    </View>
                    :
                    <FlatList
                        data={sliderImages}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 50 }}
                        ListHeaderComponent={() => { return (<Text style={styles.title}>عکس های اسلایدر</Text>) }}
                        ListFooterComponent={renderFooter}
                        renderItem={({ item, index, separators }) => (
                            <View style={styles.componentView}>
                                <TextButton
                                    title="حذف عکس"
                                    style={{ width: SCREEN_WIDTH * 0.2 }}
                                    textStyle={{ color: 'red' }}
                                    onPress={async () => {
                                        setLoading(true);
                                        await dispatch(deleteHomeSliderImage(item.id))
                                        setLoading(false);
                                    }}
                                />
                                <Image
                                    source={{ uri: API_BASE_URL + `/${item.pictureUrl.split("public/").pop()}` }}
                                    style={{ width: SCREEN_WIDTH * 0.7, height: 150, resizeMode: 'contain' }}
                                />
                            </View>
                        )}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    title: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 20
    },
    componentView: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c2c2c2",
        flexDirection: 'row'
    }
});

export default HomeCrmScreen;