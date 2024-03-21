
import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles';
import Header from './Header';
import Footer from './Footer';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS,
} from '../constants/Game';

export default function Home({ navigation }) {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <>
            <Header />
            <View >
                {!hasPlayerName ?
                    <>
                        <Text style={styles.name}>
                            For scoreboard enter your name... </Text>
                        <TextInput style={styles.playername} onChangeText={setPlayerName} autoFocus={true}></TextInput>
                        <Pressable
                            onPress={() => handlePlayerName(playerName)}>
                            <Text style={styles.ok}>OK</Text>
                        </Pressable>
                    </>

                    :
                    <>
                        <View style={styles.rulesicon}>
                            <MaterialCommunityIcons
                                name='information'
                                size={50}
                                color='#D9B70D'></MaterialCommunityIcons>
                            <Text style={styles.rulesTitle}>RULES OF THE GAME:</Text>

                        </View>
                        <Text style={styles.rules} multiline='true'>
                            THE GAME: Upper section of the classic Yahtzee
                            dice game. You have {NBR_OF_DICES} dices and
                            for the every dice you have {NBR_OF_THROWS}
                            throws. After each throw you can keep dices in
                            order to get same dice spot counts as many as
                            possible. In the end of the turn you must select
                            your points from {MIN_SPOT} to {MAX_SPOT}.
                            Game ends when all points have been selected.
                            The order for selecting those is free.
                        </Text>
                        <Text style={styles.rules} multiline='true'>
                            POINTS: After each turn game calculates the sum
                            for the dices you selected. Only the dices having
                            the same spot count are calculated. Inside the game
                            you can not select same points from {MIN_SPOT} to
                            {MAX_SPOT} again.</Text>
                        <Text style={styles.rules} multiline='true'>GOAL: To get points as much as possible.
                            {BONUS_POINTS_LIMIT} points is the limit of
                            getting bonus which gives you {BONUS_POINTS}
                            points more.</Text>
                        <Text style={styles.lucky}>Good luck, {playerName}</Text>
                        <Pressable
                            onPress={() => navigation.navigate(
                                'Gameboard', { player: playerName })}>
                            <Text style={styles.ok}>PLAY</Text>
                        </Pressable>
                    </>
                }
            </View>
            <Footer></Footer>
        </>
    )
}