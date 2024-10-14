import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

export function RatingStars(props) {
    // Recieve the ratings object from the props
    let ratingObj = props.ratingObj;

    // This array will contain our star tags. We will include this
    // array between the view tag.
    let stars = [];
    // Loop 5 times
    for (var i = 1; i <= 5; i++) {
        // set the path to filled stars
        let path = require('../assets/images/star-filled.png');
        // If ratings is lower, set the path to unfilled stars
        if (i > ratingObj.ratings) {
            path = require('../assets/images/star-unfilled.png');
        }
        stars.push((<Image style={[styles.image, props.starStyle]} source={path} />));
    }

    return (
        <View style={[styles.container, props.containerStyle]}>
            { stars}
            {
                props.disableText ? null : <Text style={[styles.text, props.textStyle]}>({ratingObj.views})</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 8.5,
        height: 8.5
    },
    text: {
        fontSize: 10,
        marginLeft: 10,
        marginRight: 7,
        color: '#9B9B9B'
    }
});
