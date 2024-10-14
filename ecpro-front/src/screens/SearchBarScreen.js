import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input, FilledButton } from '../components';
const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchBarScreen = (props) => {
    const [input, setInput] = useState();
    const data = [{ name: 'گوشی', id: 1 }, { name: 'گوشی موبایل', id: 2 }, { name: 'یخچال', id: 3 }, { name: 'تلوزیون', id: 4 }, { name: 'پارکت', id: 5 }, { name: 'تابلو', id: 6 }, { name: 'دوش', id: 7 }, { name: 'کیف', id: 8 }, { name: 'شلوار', id: 9 }]
    return (
        <ScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={styles.container}
        >
            <View style={{ marginTop: 20, flex: 0.01 }}>
                <Text style={styles.title}>جست و جو</Text>
                <Text style={styles.title}>در بین هزاران محصول</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', flex: 0.01 }}>
                <Input
                    value={input}
                    onChangeText={text => setInput(text)}
                    placeholder="دنبال چه چیزی هستی؟"
                    style={styles.input}

                />
                <FilledButton
                    logo
                    logoName="search1"
                    containerStyle={{ flex: 0.2, height: SCREEN_WIDTH * 0.13, justifyContent: 'flex-end', borderRadius: 15, marginLeft: 10 }}
                    onPress={() => {
                        props.navigation.navigate('SearchScreen', {
                            order: 'createdAt',
                            searchText: input
                        })
                    }}
                />
            </View>
            <View style={{ padding: 20, flex: 1 }}>
                <Text style={{ fontSize: SCREEN_WIDTH * 0.045, fontWeight: '600' }}>پرتکرارترین کلمات جست و جو شده:</Text>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                    style={{ paddingTop: 20 }}
                    renderItem={({ item, index, separators }) => (
                        <TouchableOpacity>
                            <View style={styles.textCarts}>
                                <Text numberOfLines={1} style={{ textAlign: 'center' }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: SCREEN_WIDTH * 0.09,
        color: '#646464',
        paddingHorizontal: 10,
        fontFamily: 'IRANSans_Bold'
    },
    input: {
        flex: 1,
        borderRadius: 20,
        textAlign: 'right'
    },
    textCarts: {
        borderRadius: 20,
        borderColor: '#d1d1d1',
        borderWidth: 1,
        // shadowColor: 'rgba(0, 0, 0, 0.04)',
        // shadowOffset: {
        //     height: 8,
        //     width: 0,
        // },
        // shadowOpacity: 1,
        // shadowRadius: 12,
        // elevation: 1,
        backgroundColor: 'white',
        width: SCREEN_WIDTH * 0.28,
        height: SCREEN_WIDTH * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10
    }
});

export default SearchBarScreen;