import React from 'react'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import styles from '../styles/styles'
import Header from './Header';
import Footer from './Footer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

let list =[];
export default function Scoreboard ({navigation, route}) {
  return (
    <>
     <Header />
    <View style={styles.gameboard}>
    <MaterialCommunityIcons
    name='view-list'
    size='55'
    color='steelblue'></MaterialCommunityIcons>
      <Text>
       Top Seven
      </Text>
    </View>
    <Footer />
    </>
  )
}