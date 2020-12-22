import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, LogBox, Alert, TextInput, Dimensions, StatusBar, RefreshControl } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNetInfo } from "@react-native-community/netinfo";
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';

//Screens
import PostsScreen from './Screens/PostScreen';
import CategoriesItems from './Screens/CategoriesItems';
import CategoriesScreen from './Screens/CategoriesScreen';
import MoreScreen from './Screens/MoreScreen';
import SearchScreen from './Screens/SearchScreen';
import NotifWebView from './Screens/NotifWebView';

//Components
import Posts from './components/Posts';
import Categories from './components/Categories';
import Variables from './components/Variables';
import * as RootNavigation from './components/RootNavigation';
import { navigationRef } from './components/RootNavigation';

function HomeScreen() {

  LogBox.ignoreAllLogs();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [ref, setRef] = useState(false)
  const [update, setUpdate] = useState(1)

  function onNotifOpened(openResult) {
    if (openResult.notification.payload.additionalData!=undefined) {

      if(openResult.notification.payload.additionalData.url!=undefined && openResult.notification.payload.additionalData.title!=undefined){

      navigation.navigate('NotifWebView', {
        html: openResult.notification.payload.additionalData.url,
        title: openResult.notification.payload.additionalData.title.substring(0, 30)
      })
    }
   }
  }

  //OneSignal
  OneSignal.init(Variables.OneSignalAppId, { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
  OneSignal.inFocusDisplaying(1); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
  OneSignal.addEventListener('opened', onNotifOpened);

  useEffect(() => {

    SplashScreen.hide()

    setTimeout(() => {
      setRef(false);
    }, 1000);

    return OneSignal.removeEventListener('opened', onNotifOpened);

  }, [ref])
  

  return (
    !netInfo.isInternetReachable && netInfo.details != null
      ?
      <View style={styles.container}>
        <Text>Internet is not available</Text>
        <StatusBar barStyle="dark-content" backgroundColor="#ECEFF1" />
      </View>
      :
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={ref} onRefresh={() => { setRef(true); setUpdate(update + 1) }} />
        }>
        <View style={styles.container}>
          <Categories net={true} update={update} />
          <Posts net={true} update={update} />
          <StatusBar barStyle="dark-content" backgroundColor="#ECEFF1" />
        </View>
      </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  textinput: {
    height: 40,
    backgroundColor: '#E0E0E0',
    minWidth: Dimensions.get("window").width - 60,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  netbutton: {
    borderRadius: 5,
    margin: 5,
    padding: 6,
  }
});



const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (

    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Variables.Tab_Active_Color,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen name="Categories" component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="gg-circle" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen name="More" component={MoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="th-large" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}


const Stack = createStackNavigator();

function App() {

  const [search, setSearch] = useState("");

  function goSearch() {
    if (search != '') {
      RootNavigation.navigate('Search', { query: search })
    }
    setSearch('');

  }

  return (
    <NavigationContainer ref={navigationRef}>

      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={{
            headerTitle: () => <TextInput style={styles.textinput}
              value={search}
              onSubmitEditing={goSearch}
              onChangeText={(text) => setSearch(text)}
              placeholder="  Search" />,
            headerStyle: {
              backgroundColor: Variables.themeHeader,
            },
            headerRight: () => (<Icon style={{ marginHorizontal: 10, height: 30 }}
              name="search" size={24} color="black" onPress={goSearch} />),
          }
          }
        />

        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={{

            headerTitle: () => <Text></Text>,
            headerStyle: {
              backgroundColor: Variables.themeHeader,
            },
            headerTintColor: Variables.themeHeaderText,
          }}
        />

        <Stack.Screen
          name="NotifWebView"
          component={NotifWebView}
          options={{

            headerTitle: () => <Text></Text>,
            headerStyle: {
              backgroundColor: Variables.themeHeader,
            },
            headerTintColor: Variables.themeHeaderText,
          }}
        />

        <Stack.Screen
          name="CategoriesItems"
          component={CategoriesItems}
          options={{
            headerTitle: () => <Text></Text>,
            headerStyle: {
              backgroundColor: Variables.themeHeader,
            },
            headerTintColor: Variables.themeHeaderText,
          }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTitle: () => <Text>Search Results</Text>,
            headerStyle: {
              backgroundColor: Variables.themeHeader,
            },
            headerTintColor: Variables.themeHeaderText,
          }}
        />


      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;
