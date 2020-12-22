import React, { useEffect, useState } from 'react';
import { Text, FlatList, Image, StyleSheet, Dimensions,View} from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView,TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Variables from '../components/Variables';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import {useNetInfo} from "@react-native-community/netinfo";
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';


const BannerAdUnit = __DEV__ ? TestIds.BANNER : Variables.BannerAdUnit;

function SearchScreen({route}) {

    const netInfo = useNetInfo();

    const search = route.params.query.replace(/\s/g,"%20");

    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
    const navigation = useNavigation() //To move between screen
    const [posts, setPosts] = useState('empty')
    // console.warn(posts);

    useEffect(() => {
        async function fetchPosts() {
            await fetch(Variables.url + "/wp-json/wp/v2/posts?_embed=true&search=" + search)
                .then((res) => res.json())
                .then(res2 => setPosts(res2))
        }
        fetchPosts();
    },[]);

    const renderItem = ({ item }) => (
        <>
        <TouchableWithoutFeedback onPress={() => {navigation.navigate('Posts',{
            html : item.link,
            title : item.title.rendered.replace("&#038;","").substring(0, 30) })
            }
        
        }>
        <Card containerStyle={styles.card}>
            <Image source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }}
                style={styles.image} />
            <Text style={styles.text}>{item.title.rendered.replace(/&#...?.?;?/,"")}</Text>
            <Text style={styles.date}>{item.date.replace(/T.*$/, "")}</Text>
        </Card>
        </TouchableWithoutFeedback>
        <View style={styles.BannerAd}>
        <BannerAd
          unitId={BannerAdUnit}
          size={BannerAdSize.BANNER}
          requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          }}
          />
          </View>
        </>
    );

    const Shimmer = () =>{
        return(
        <>
        <ShimmerPlaceHolder style={styles.shimmer} height={200} width={Dimensions.get('window').width - 20}/>
        <ShimmerPlaceHolder style={styles.shimmerText} height={15} width={Dimensions.get('window').width - 20} />
        <ShimmerPlaceHolder style={styles.shimmerText} height={15} width={Dimensions.get('window').width - 20}/>
        </>
        
        
        );
    }

    const Loading = () => {
        return (
            <ScrollView>
        <ShimmerPlaceHolder style={{borderRadius:10, margin:10}} height={25} width={Dimensions.get('window').width - 170} />
         <Shimmer />
         <Shimmer />
         <Shimmer />
         <Shimmer />
         <Shimmer />
         </ScrollView>
        );
    }
   
    
    
    return (
        !netInfo.isInternetReachable && netInfo.details != null ?
        <View style={styles.container}><Text>Internet is not available</Text></View>
    : posts == 'empty' ? <Loading /> :
        posts.length === 0 ? <Text style={styles.heading}>No Results Found For {route.params.query}</Text> :
            <FlatList
                ListHeaderComponent={()=> <Text style={styles.heading}>Search Result For {route.params.query}</Text>}
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
    );

}


const styles = StyleSheet.create({
    image: {
        width: '100%', height: 200, margin: 0, borderTopLeftRadius: 7, borderTopRightRadius: 7,
    },
    card: {
        padding: 0, borderRadius: 7, marginBottom:3,
    },
    text: {
        margin: 5, marginBottom: 3, fontWeight: "bold",
    },
    date: {
        color: "grey", marginLeft: 5, fontSize: 12, marginBottom: 3,
    },
    shimmer: {
        margin:10,  borderRadius:10,
    },
    shimmerText:{
        margin:10, borderRadius:10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 10,
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
      },
    BannerAd : {
        width:0, marginVertical:15, minWidth:Dimensions.get('window').width, alignItems:'center',
    }
})

export default SearchScreen;