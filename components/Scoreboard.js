import React from 'react'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import styles from '../styles/styles'
import Header from './Header';
import Footer from './Footer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

let list = [];
export default function Scoreboard({ navigation, route }) {

  const [playerName, setPlayerName] = useState('');


  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }

  }, []);
  return (
    <>
      <Header />
      <View style={styles.gameboard}>
        <MaterialCommunityIcons
          name='view-list'
          size={55}
          color='#D9B70D'></MaterialCommunityIcons>
        <Text>
          Top Seven:
        </Text>

      </View>
      <Footer />
    </>
  )
}