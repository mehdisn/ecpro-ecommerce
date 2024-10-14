import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import TimeAgo from 'react-native-timeago';
import { RatingSection } from '../components/RatingSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FindProductComments } from '../actions/ProductActions';
const SLIDER_WIDTH = Dimensions.get('window').width;

const CommentsScreen = (props) => {
    const dispatch = useDispatch();
    const { productId } = props.route.params

    useEffect(() => {
        const loadComments = async () => {
            await dispatch(FindProductComments(productId))
        }
        loadComments();
    }, [dispatch])


    let comments = useSelector(state => state.product.comments);

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <FlatList
                data={comments}
                style={{ bottom: 15 }}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={({ item, index, separators }) => (
                    <View style={styles.container}>
                        <View style={{ paddingRight: 20, paddingLeft: 10, width: SLIDER_WIDTH * 0.85 }}>
                            <View style={styles.content}>
                                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 15, paddingBottom: 7, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>
                                    <Text style={{ color: 'gray' }}>{item.fullName}</Text>
                                    <Text style={{ color: 'gray', fontSize: 20, paddingRight: 10, paddingLeft: 5 }}>*</Text>
                                    <TimeAgo time={item.createdAt} style={{ color: 'gray' }} />
                                </View>
                                <Text style={{ textAlign: 'right', fontSize: SLIDER_WIDTH * 0.041, paddingTop: 7 }}>{item.content}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <RatingSection
                                rating={item.rating}
                            />
                        </View>
                    </View>
                )}
            />
            <View style={styles.addComment}>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row' }}
                    onPress={() => props.navigation.navigate('addCommentScreen', {
                        productId: productId
                    })}
                >
                    <FontAwesome name='comment-o' color='white' size={SLIDER_WIDTH * 0.055} />
                    <Text style={{ color: 'white', paddingLeft: 5, fontSize: SLIDER_WIDTH * 0.04, fontWeight: '600' }}>ثبت دیدگاه</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SLIDER_WIDTH,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
    },
    addComment: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        bottom: 20,
        left: 20,
        position: 'absolute',
        width: SLIDER_WIDTH * 0.325,
        height: SLIDER_WIDTH * 0.135,
        borderRadius: 30,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {},
        elevation: 2,
        backgroundColor: '#171A40'
    }
});

export default CommentsScreen;