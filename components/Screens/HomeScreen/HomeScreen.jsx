import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Footer from '../Footer-Header/Footer'
import Header from '../Footer-Header/Header';
export default function  HomeScreen() {
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.insideContainer}>
        <Text>ahla</Text>
      </View>
      <Footer/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
  flex:1
  },
  insideContainer:{
    flex:0.9999
  }
 });