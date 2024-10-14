import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SliderPicker } from 'react-native-slider-picker';
import { Input, FilledButton } from '../components';
import { addNewComment } from '../actions/ProductActions';
const SCREEN_WIDTH = Dimensions.get('window').width;

const AddCommentScreen = (props) => {
    const [Rating, setRating] = useState(0);
    const [Content, setContent] = useState('');
    const [Title, setTitle] = useState('');
    const dispatch = useDispatch();
    const { productId } = props.route.params;

    return (
        <View style={{ padding: 20 }}>
            <View style={{ borderBottomWidth: 1, height: SCREEN_WIDTH * 0.85, borderBottomColor: '#e2e2e2' }}>
                <Text style={{ textAlign: 'right', fontWeight: 'bold', paddingBottom: 10 }}>دیدگاه خود را بنویسید</Text>
                <Input
                    value={Title}
                    onChangeText={text => {
                        setTitle(text)
                    }}
                    placeholder={'عنوان نظر'}
                    style={styles.input}
                />

                <Input
                    value={Content}
                    multiLine={true}
                    numberOfLines={4}
                    onChangeText={text => {
                        setContent(text)
                    }}
                    style={{ height: SCREEN_WIDTH * 0.5, textAlign: 'right', top: 5, justifyContent: 'flex-start' }}
                    placeholder={'متن نظر'}
                />
            </View>

            <View style={{ top: 30 }}>
                <SliderPicker
                    minLabel={'خیلی بد'}
                    midLabel={'معمولی'}
                    maxLabel={'عالی'}
                    maxValue={5}
                    callback={position => {
                        setRating(position);
                    }}
                    defaultValue={Rating}
                    labelFontColor={"#6c7682"}
                    labelFontWeight={'600'}
                    showFill={true}
                    fillColor={'green'}
                    labelFontWeight={'bold'}
                    labelFontSize={15}
                    showSeparatorScale={true}
                    buttonBackgroundColor={'#fff'}
                    buttonBorderColor={"#6c7682"}
                    buttonBorderWidth={1}
                    buttonDimensionsPercentage={5}
                    heightPercentage={1}
                    widthPercentage={80}
                />
                <Text style={{ textAlign: 'right' }}>امتیاز شما: {Rating}</Text>
            </View>

            <View style={{ top: 50 }}>
                <FilledButton
                    title={'ثبت نظر'}
                    containerStyle={{ top: 0, backgroundColor: !Boolean(Content && Title) ? 'gray' : '#171A40' }}
                    disabled={!Boolean(Content && Title)}
                    onPress={() => {
                        dispatch(addNewComment({ productId: productId, content: Content, title: Title, rating: Rating }));
                        props.navigation.goBack();
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
        textAlign: 'right',
        top: 5
    },
});

export default AddCommentScreen;
