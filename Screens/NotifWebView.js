import React, { useEffect,useState } from 'react';
import { View, Dimensions, Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import { useNetInfo } from "@react-native-community/netinfo";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd} from '@react-native-firebase/admob';
import Variables from '../components/Variables';

const BannerAdUnit = __DEV__ ? TestIds.BANNER : Variables.BannerAdUnit;
const IntAdUnit = __DEV__ ? TestIds.INTERSTITIAL : Variables.InterstitialAdUnit;
  

let interstitial = InterstitialAd.createForAdRequest(IntAdUnit);
       
function NotifWebView({ route }) {

    const netInfo = useNetInfo();

    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

    const navigation = useNavigation();

    interstitial.load();
    
    // const [adloaded, setadLoaded] = useState(0);


    useEffect(() => {

        navigation.setOptions({
            headerTitle: () => <Text>{route.params.title + "..."} </Text>,
        })
       

     }, []);

  
// Function to show InterstitialAd 50% chance to show 
//50% chance to not show for better user experience.

function showInterstitial(){
    let showIntAd = Math.floor(Math.random() * 2); //generate 0 or 1
    if (showIntAd){
        interstitial.show();
    }
}

const content = route.params.html;

    return (
        <>
            <WebView
                startInLoadingState={true}
                source={{ uri: content }}
                onShouldStartLoadWithRequest={(event) => {
                    if (event.url != content) {
                        Linking.openURL(event.url)
                        return false;
                    }else{
                    return true;
                    }
                }}
                onLoad={showInterstitial}
                renderLoading={() => {
                    return (
                        !netInfo.isInternetReachable && netInfo.details != null ?
                            <View style={{
                                container: {
                                    flex: 1,
                                    backgroundColor: '#fff',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#F5F5F5'
                                },
                            }}>
                                <Text>Internet is not available</Text></View>
                            :
                            <View style={{ height: Dimensions.get('window').height, marginVertical: 3 }}>
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />
                                <ShimmerPlaceHolder style={{ marginVertical: 5, width: Dimensions.get('window').width }} />

                            </View>
                    )
                }}
            />
            <View style={{minWidth:Dimensions.get('window').width, paddingHorizontal:'5%',}}>
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

}

export default NotifWebView;