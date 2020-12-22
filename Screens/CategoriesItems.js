import React, { useEffect, useState } from 'react';
import { Text, FlatList, Image, StyleSheet, Dimensions, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView,TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Variables from '../components/Variables';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { useNetInfo } from "@react-native-community/netinfo";


const BannerAdUnit = __DEV__ ? TestIds.BANNER : Variables.BannerAdUnit;

function CategoriesItems({route}) {

    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
    const navigation = useNavigation() //To move between screen
    const [categoriesitems, setCI] = useState([]);
    const netInfo = useNetInfo();
    let cimg;

    useEffect(() => {
        //To change top header text
        navigation.setOptions({
            headerTitle: () =><Text>{route.params.cname}</Text>,
          })

        async function fetchCI() {
            await fetch(Variables.url + "/wp-json/wp/v2/posts?_embed=true&categories=" + route.params.cid )
                .then((res) => res.json())
                .then((res2) => setCI(res2));

               
        }
        fetchCI();
    },[]);

    const renderItem = ({ item }) => {
        
    if(item._embedded['wp:featuredmedia']!=undefined){
            cimg=item._embedded['wp:featuredmedia']['0'].source_url;
     }else{
            cimg="none";
         }

    return(
        <>
        <TouchableWithoutFeedback onPress={() => {navigation.navigate('Posts',{
            html : item.link,
            title : item.title.rendered.replace("&#038;","").substring(0, 30) })
            }
        
        }>
        <Card containerStyle={styles.card}>
            <Image source={{ uri: cimg }}
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
    );}

    const Shimmer = () =>{
        return(
        <>
        <ShimmerPlaceHolder style={styles.shimmer} height={200} width={Dimensions.get('window').width - 20}>
            <Text>PlaceHolder</Text>
        </ShimmerPlaceHolder>
        <ShimmerPlaceHolder style={styles.shimmerText} height={15} width={Dimensions.get('window').width - 20}>
            <Text>PlaceHolder</Text>
        </ShimmerPlaceHolder>
        <ShimmerPlaceHolder style={styles.shimmerText} height={15} width={Dimensions.get('window').width - 20}>
            <Text>PlaceHolder</Text>
        </ShimmerPlaceHolder>
        </>
        
        
        );
    }

    const Loading = () => {
        return (
            <ScrollView>
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
         <View style={styles.container}>
          <Text>Internet is not available</Text>
         </View>
         :
        categoriesitems.length === 0 ? <Loading /> :
        <View style={styles.container}>
            <FlatList
                data={categoriesitems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
             </View>
    );

}

const styles = StyleSheet.create({
    image: {
        width: '100%', height: 200, margin: 0, borderTopLeftRadius: 7, borderTopRightRadius: 7,
    },
    card: {
        padding: 0, borderRadius: 7, marginBottom:3, minWidth:Dimensions.get('window').width - 30},
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

export default CategoriesItems;