import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View,Linking, Alert } from 'react-native';
import Variables from '../components/Variables';

const options =
    {
        list1: 'Facebook',
        list2: 'Twitter',
        list3: 'Instagram',
        list4: 'Rate Us',
        list5: 'Visit Website',
        list6: 'About Us',
    }

function MoreScreen() {
  return (
    <View style={styles.container}>

    <TouchableOpacity onPress={()=> Linking.openURL(Variables.Facebook_URL)}>
      <Text style={styles.list}>{options.list1}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> Linking.openURL(Variables.Twitter_URL)}>
      <Text style={styles.list}>{options.list2}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> Linking.openURL(Variables.Instagram_URL)}>
      <Text style={styles.list}>{options.list3}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> Linking.openURL(Variables.Rate_Us_Link)}>
      <Text style={styles.list}>{options.list4}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> Linking.openURL(Variables.url)}>
      <Text style={styles.list}>{options.list5}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> Alert.alert('About Us', 'This is our first site')}>
      <Text style={styles.list}>{options.list6}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor:'#ECEFF1',
    },
    list: {
      padding: 15,
      fontSize: 18,
      fontSize: 14,
    },
  });

export default MoreScreen;
