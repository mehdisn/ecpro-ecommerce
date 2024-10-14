import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.93);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const renderItem = ({ item, index, parallaxProps }) => {
    return (
        <View style={styles.itemContainer}>
            {/* <ParallaxImage
                source={require("../assets/download.jpg")}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={'rgba(255, 255, 255, 0.4)'}
                {...parallaxProps}
            /> */}
        </View>
    )
}

const MyCarousel = (props) => {
    const [ActiveSlide, setActiveSlide] = useState(0);
    return (
        <View style={[{ flex: 1, }, props.viewStyle]}>
            <Carousel
                layout={props.layout ? props.layout : 'default'}
                data={props.data ? props.data : ENTRIES1}
                sliderWidth={props.sliderWidth ? props.sliderWidth : SLIDER_WIDTH}
                itemWidth={props.itemWidth ? props.itemWidth : ITEM_WIDTH * 1.05}
                renderItem={props.renderItem ? props.renderItem : renderItem}
                containerCustomStyle={props.containerStyle ? props.containerStyle : styles.carouselContainer}
                autoplay={props.autoplay ? props.autoplay : false}
                autoplayDelay={5000}
                autoplayInterval={5000}
                inactiveSlideScale={1}
                inactiveSlideOpacity={0.6}
                inactiveSlideShift={0}
                onSnapToItem={(index) => setActiveSlide(index)}
                loop={props.loop ? props.loop : false}
                hasParallaxImages={props.hasParallaxImages ? props.hasParallaxImages : false}
                bounces={props.bounces}
            />
            <Pagination
                dotsLength={props.dotsLength ? props.dotsLength : ENTRIES1.length}
                activeDotIndex={ActiveSlide}
                containerStyle={props.paginationContainer ? props.paginationContainer : styles.paginationContainer}
                dotColor={props.dotColor ? props.dotColor : 'black'}
                dotStyle={props.paginationDot ? props.paginationDot : styles.paginationDot}
                inactiveDotColor={props.inactiveDotColor ? props.inactiveDotColor : 'black'}
                inactiveDotOpacity={props.inactiveDotOpacity ? props.inactiveDotOpacity : 0.4}
                inactiveDotScale={props.inactiveDotScale ? props.inactiveDotScale : 0.6}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    carouselContainer: {
        paddingHorizontal: SLIDER_WIDTH * 0.021,
        transform: [{ scaleX: -1 }],
        top: SLIDER_WIDTH * 0.155,
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue',
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: {
            height: 8,
            width: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 5,
        borderRadius: 3,
    },
    paginationContainer: {
        transform: [{ scaleX: -1 }],
        height: SLIDER_WIDTH * 0.2
    },
    paginationDot: {
        width: SLIDER_WIDTH * 0.02,
        height: SLIDER_WIDTH * 0.02,
        borderRadius: 4,
        marginHorizontal: -SLIDER_WIDTH * 0.01
    }
});

export const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    }
];

export default MyCarousel;