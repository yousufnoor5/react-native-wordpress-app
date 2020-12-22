import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet,View,Dimensions  } from 'react-native';
import { Button, } from 'react-native-elements';
import { ScrollView} from 'react-native-gesture-handler';
import Variables from './Variables';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';



function Categories(props) {

    if(props.net){
    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
    const navigation = useNavigation() //To move between screen

    const buttonColors = ['#F44336','#AD1457','#4A148C','#3D5AFE','#00BCD4','#00695C','#43A047','#FF3D00', '#4E342E','#37474F']

    const [categories, setCategories] = useState([])

   useEffect(() => {
        async function fetchCategories() {
            await fetch(Variables.url + "/wp-json/wp/v2/categories")
                .then((res) => res.json())
                .then(res2 => setCategories(res2))
        }
        fetchCategories();
    },[props.update]);


    const renderItem = ({ item }) => (
        <View style={styles.buttonView}>
        { item.name != "Uncategorized" && (
        <Button buttonStyle={{backgroundColor:buttonColors[Math.floor(Math.random() * 10)], borderRadius:25, padding:10, paddingHorizontal:25}}
        title={item.name.replace("&amp;","")}
        onPress={() => {navigation.navigate('CategoriesItems',{
            cid : item.id,
            cname : item.name,
           })}}  />)
        }
        </View>
    );

    const Shimmer = () =>{
        return(
        <>
        <ShimmerPlaceHolder style={styles.shimmer} height={50} width={150}/>
        </>
        
        
        );
    }

    const Loading = () => {
        return (
            <>
         <ShimmerPlaceHolder style={{borderRadius:10, margin:10,alignSelf:'flex-start'}} height={25} width={Dimensions.get('window').width - 170} />
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
        categories.length === 0 ? <Loading /> :
          <>
          <Text style={styles.heading}>Categories</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.flatlist}
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            </>
    );
    }
    

}

const styles = StyleSheet.create({
    shimmer: {
       margin:10, borderRadius:25,borderBottomLeftRadius:25, borderBottomRightRadius:25,
    },
    buttonView:{
        margin:10, borderRadius:10, height:100
    },
    flatlist:{
        height:80,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 10,
      },
})

export default Categories;