import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, Dimensions, View, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Variables from '../components/Variables';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useNetInfo } from "@react-native-community/netinfo";


function CategoriesScreen() {

    const netInfo = useNetInfo();

    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

    const navigation = useNavigation() //To move between screen

    const cardColors = ['#F44336', '#AD1457', '#4A148C', '#3D5AFE', '#00BCD4', '#00695C', '#43A047', '#FF3D00', '#4E342E', '#37474F']

    const [categories, setCategories] = useState([])

    const [ref, setRef] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setRef(false);
        }, 1000);

        async function fetchCategories() {
            await fetch(Variables.url + "/wp-json/wp/v2/categories")
                .then((res) => res.json())
                .then(res2 => setCategories(res2))
        }

        fetchCategories();
    }, [ref]);

    const renderItem = ({ item }) => (
        <View>
            { item.name != "Uncategorized" && (
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('CategoriesItems', {
                        cid: item.id,
                        cname: item.name,
                    })
                }}>
                    <View style={{
                        backgroundColor: cardColors[Math.floor(Math.random() * 10)],
                        borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, margin: 10, elevation: 5
                    }}>
                        <Text style={styles.text}>{item.name.replace("&amp;", "")}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );

    const Shimmer = () => {
        return (
            <>
                <ShimmerPlaceHolder style={styles.shimmer} height={50} width={Dimensions.get('window').width - 20} />
            </>


        );
    }

    const Loading = () => {
        return (
            <>
                <ScrollView>
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                </ScrollView>
            </>
        );
    }



    return (
    !netInfo.isInternetReachable && netInfo.details != null ? <View style={styles.container}>
            <Text>Internet is not available</Text>
        </View> :
            categories.length === 0 ? <Loading /> :
                <FlatList
                    style={styles.flatlist}
                    showsVerticalScrollIndicator={false}
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={ref} onRefresh={() => setRef(true)} />
                    }
                />
    );
}

const styles = StyleSheet.create({
    shimmer: {
        margin: 10, borderRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
    },
    flatlist: {
        height: Dimensions.get('window').height
    },
    text: {
        fontWeight: 'bold', color: 'white', fontSize: 20
    },
    container: {
        flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5'
    },
})

export default CategoriesScreen;