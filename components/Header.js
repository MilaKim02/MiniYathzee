import React from 'react'
import { Text, View } from 'react-native'
import styles from '../styles/styles'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
       <MaterialCommunityIcons 
        name='dice-multiple'
        size={45}
        color='#ffffff'
      />
        </View>

      <Text style={styles.title}>
        Mini-Yahtzee
        </Text>
        <MaterialCommunityIcons
        name='dice-multiple'
        size={45}
        color='#ffffff'
      />
        
    </View>
  )
}