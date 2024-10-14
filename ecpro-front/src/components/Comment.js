import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Dimensions, View } from 'react-native';
import { RatingStars } from './RatingStars';
import TimeAgo from 'react-native-timeago';
const SLIDER_WIDTH = Dimensions.get('window').width;

export function Comment(props) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.container}>
                <View style={{ position: 'absolute', top: 0, right: 0, padding: 10 }}>
                    <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                    <RatingStars
                        containerStyle={{ justifyContent: 'flex-start', width: SLIDER_WIDTH * 0.68, top: 3 }}
                        disableText
                        starStyle={{
                            width: 12,
                            height: 12
                        }}
                        ratingObj={{
                            ratings: props.rating,
                            views: 34000
                        }}
                    />
                </View>
                <View style={styles.content}>
                    <Text numberOfLines={4} style={{ textAlign: 'right', fontSize: SLIDER_WIDTH * 0.041 }}>{props.content}</Text>
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', top: SLIDER_WIDTH * 0.43 }}>
                    <Text style={{ color: 'gray', paddingRight: SLIDER_WIDTH * 0.15 }}>{props.fullName}</Text>
                    <TimeAgo time={props.createdAt} style={{ color: 'gray' }} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        height: SLIDER_WIDTH * 0.5,
        width: SLIDER_WIDTH * 0.73,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        margin: 8,
        shadowOffset: {},
        transform: [{ scaleX: -1 }],
        elevation: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right'
    },
    content: {
        justifyContent: 'flex-start',
        padding: 10,
        height: SLIDER_WIDTH * 0.28,
        top: SLIDER_WIDTH * 0.03,
        
    }
});