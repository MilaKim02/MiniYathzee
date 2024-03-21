import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
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
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

let board = [];

export default Gameboard = ({ navigation, route }) => {

  const [playerName, setPlayerName] = useState('');
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  //are dices selected or not?
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));

  //dice spots (1,2,3,4,5,6) for each dice
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

  //are dice points selected or not
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));

  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

//one way to handle with useeffect
//this useeffect is for reading scoreboard from the asyncStorage  when user is navigating back to screen(
  //have a look at the assigment instruction). Trigger here is the navigation for useeffect

  //this useeffect is for handling the gameflow so that the game
//does not stop too early or doea not continue after it should not
//trigger here (in teacher solution) is nbrofthrowsLeft. Another 

  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }

  }, []);

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={'dice' + dice}>
        <Pressable
          key={'dice' + dice}
          onPress={() => selectDice(dice)}
        >
          <MaterialCommunityIcons
            name={board[dice]}
            key={'dice' + dice}
            size={50}
            color={getDiceColor(dice)}
          >
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }
  //call the function for calculating points inside text component
  //for replacing the zero..

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={'pointsRow' + spot}>
        <Text key={'pointsRow' + spot}>
        {getSpotTotal(spot)}
        </Text>
      </Col>
    )
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={'buttonsRow' + diceButton}>
        <Pressable
         key={'buttonsRow' + diceButton}
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            name={'numeric-' + (diceButton + 1) + '-circle'}
            key={'buttonsRow' + diceButton}
            size={35}
            color={getDicePointsColor(diceButton)}
          >
          </MaterialCommunityIcons>
        </Pressable>
        
      </Col>
    );
  }

  const selectDice = (i) => {
    if (rollCount < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    }
    else {
      setStatus('You have to throw dices first');
    }
  }

  function getDiceColor(i) {
    return selectedDices[i] ? '#253C59' : '#D9B70D';
  }

  const selectDicePoints = (i) => {
    //very first version
    let selected = [...selectedDices];
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal];
    selectedPoints[i] = true;
    let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
    points[i] = nbrOfDices * (i + 1);
    setDicePointsTotal(points);
    setSelectedDicePoints(selectedPoints);
    
    return points[i];
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  const throwDices = () => {
    // if (rollCount >= NBR_OF_THROWS * MAX_SPOT) {
    //   setStatus('Game over'); 
    //   return;
    
    // }
    if (nbrOfThrowsLeft ===  0 && rollCount < NBR_OF_THROWS) {
      setNbrOfThrowsLeft(NBR_OF_THROWS); // Palautetaan heittovuorojen määrä kolmeen
    setRollCount(0); // Nollataan heittovuorojen laskuri
    setSelectedDices(new Array(NBR_OF_DICES).fill(false)); // Nollataan valitut nopat
    setDiceSpots(new Array(NBR_OF_DICES).fill(0)); // Nollataan noppien luvut
    setStatus('Throw dices'); // Palautetaan tila heittämään noppia
    return;
    }
    if (nbrOfThrowsLeft > 0 && rollCount < NBR_OF_THROWS) { // Jos pelaajalla on heittovuoroja jäljellä
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = 'dice-' + randomNumber;
          spots[i] = randomNumber;
         }
         }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1); // Asetetaan heittomääräksi kolme uudelleen
    setDiceSpots(spots);
    setStatus('Select and throw dices again');
    setRollCount(rollCount + 1);
    return;
   }
    if (nbrOfThrowsLeft === 0 && rollCount >= NBR_OF_THROWS) {
      calculateTotal();
   setStatus('Select your points before next throw');
    setRollCount(0); 
    return;
     }

   let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    setDiceSpots(spots);
    setStatus('Select and throw dices again');
    setRollCount(rollCount + 1); 
  }
  


  function getDicePointsColor(i) {
    if (selectedDicePoints[i] && !gameEndStatus) {
      return '#253C59';
    }
    else {
      return '#99B4BF'
    }
  }
 
  const calculateTotal = () => {
    const total = dicePointsTotal.reduce((sum, val) => sum + val, 0);
    setTotalPoints(total); // Päivitä yhteispisteiden tila
  };
  useEffect(() => {
    calculateTotal();
  }, [dicePointsTotal]);

  return (
    <>
      <Header />
      <View  style={styles.gameboard}>
       <MaterialCommunityIcons
       name='dice-multiple'
       size={55}
       color='#D9B70D'></MaterialCommunityIcons>
        <Text  style={styles.rowname}>Player: {playerName}</Text>
        <Text style={styles.row1}>Throws Left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.row}>{status}</Text>
        <Container fluid>
          <Row style={styles.dicesrow}>{dicesRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsToSelectRow}</Row>
        </Container>
       <Text style={styles.total}>Total:{totalPoints}</Text>
        <Pressable
          onPress={() => throwDices()}>
          <Text  style={styles.throw}>THROW DICES</Text>
        </Pressable>
        
      </View>
      <Footer />
    </>
  )
}
// import { useEffect, useState } from 'react'
// import { Pressable, Text, View } from 'react-native'
// import styles from '../styles/styles';
// import Header from './Header';
// import Footer from './Footer';
// import {
//   NBR_OF_DICES,
//   NBR_OF_THROWS,
//   MIN_SPOT,
//   MAX_SPOT,
//   BONUS_POINTS_LIMIT,
//   BONUS_POINTS,
// } from '../constants/Game';
// import { Container, Row, Col } from 'react-native-flex-grid';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// let board = [];

// export default Gameboard = ({ navigation, route }) => {

//   const [playerName, setPlayerName] = useState('');
//   const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
//   const [status, setStatus] = useState('Throw dices');
//   const [gameEndStatus, setGameEndStatus] = useState(false);

//   //are dices selected or not?
//   const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));

//   //dice spots (1,2,3,4,5,6) for each dice
//   const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

//   //are dice points selected or not
//   const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));

//   const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

// //one way to handle with useeffect
// //this useeffect is for reading scoreboard from the asyncStorage  when user is navigating back to screen(
//   //have a look at the assigment instruction). Trigger here is the navigation for useeffect

//   //this useeffect is for handling the gameflow so that the game
// //does not stop too early or doea not continue after it should not
// //trigger here (in teacher solution) is nbrofthrowsLeft. Another 

//   useEffect(() => {
//     if (playerName === '' && route.params?.player) {
//       setPlayerName(route.params.player);
//     }

//   }, []);

//   const dicesRow = [];
//   for (let dice = 0; dice < NBR_OF_DICES; dice++) {
//     dicesRow.push(
//       <Col key={'dice' + dice}>
//         <Pressable
//           key={'dice' + dice}
//           onPress={() => selectDice(dice)}
//         >
//           <MaterialCommunityIcons
//             name={board[dice]}
//             key={'dice' + dice}
//             size={50}
//             color={getDiceColor(dice)}
//           >
//           </MaterialCommunityIcons>
//         </Pressable>
//       </Col>
//     );
//   }
//   //call the function for calculating points inside text component
//   //for replacing the zero..

//   const pointsRow = [];
//   for (let spot = 0; spot < MAX_SPOT; spot++) {
//     pointsRow.push(
//       <Col key={'pointsRow' + spot}>
//         <Text key={'pointsRow' + spot}>
//         {getSpotTotal(spot)}
//         </Text>
//       </Col>
//     )
//   }

//   const pointsToSelectRow = [];
//   for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
//     pointsToSelectRow.push(
//       <Col key={'buttonsRow' + diceButton}>
//         <Pressable
//          key={'buttonsRow' + diceButton}
//           onPress={() => selectDicePoints(diceButton)}
//         >
//           <MaterialCommunityIcons
//             name={'numeric-' + (diceButton + 1) + '-circle'}
//             key={'buttonsRow' + diceButton}
//             size={35}
//             color={getDicePointsColor(diceButton)}
//           >
//           </MaterialCommunityIcons>
//         </Pressable>
//       </Col>
//     );
//   }

//   const selectDice = (i) => {
//     if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
//       let dices = [...selectedDices];
//       dices[i] = selectedDices[i] ? false : true;
//       setSelectedDices(dices);
//     }
//     else {
//       setStatus('You have to throw dices first');
//     }
//   }

//   function getDiceColor(i) {
//     return selectedDices[i] ? '#253C59' : '#D9B70D';
//   }

//   const selectDicePoints = (i) => {
//     //very first version
//     let selected = [...selectedDices];
//     let selectedPoints = [...selectedDicePoints];
//     let points = [...dicePointsTotal];
//     selectedPoints[i] = true;
//     let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
//     points[i] = nbrOfDices * (i + 1);
//     setDicePointsTotal(points);
//     setSelectedDicePoints(selectedPoints);
//     return points[i];
//   }

//   function getSpotTotal(i) {
//     return dicePointsTotal[i];
//   }

//   const throwDices = () => {
//     if (nbrOfThrowsLeft ===  0 && !gameEndStatus) {
//       setStatus('Select your points before next throw');
//       return 1;
//     }
//     else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
//       setGameEndStatus(false);
//       diceSpots.fill(0);
//       dicePointsTotal.fill(0);
//     }


//     let spots = [...diceSpots];
//     for (let i = 0; i < NBR_OF_DICES; i++) {
//       if (!selectedDices[i]) {
//         let randomNumber = Math.floor(Math.random() * 6 + 1);
//         board[i] = 'dice-' + randomNumber;
//         spots[i] = randomNumber;
//       }
//     }
//     setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
//     setDiceSpots(spots);
//     setStatus('Select and throw dices again')
//   }


//   function getDicePointsColor(i) {
//     if (selectedDicePoints[i] && !gameEndStatus) {
//       return '#253C59';
//     }
//     else {
//       return '#99B4BF'
//     }
//   }
 



//   return (
//     <>
//       <Header />
//       <View  style={styles.gameboard}>
//        <MaterialCommunityIcons
//        name='dice-multiple'
//        size='55'
//        color='#D9B70D'></MaterialCommunityIcons>
//         <Text  style={styles.rowname}>Player: {playerName}</Text>
//         <Text style={styles.row}>Throws Left: {nbrOfThrowsLeft}</Text>
//         <Text style={styles.row}>{status}</Text>
//         <Container fluid>
//           <Row style={styles.dicesrow}>{dicesRow}</Row>
//         </Container>
//         <Container fluid>
//           <Row>{pointsRow}</Row>
//         </Container>
//         <Container fluid>
//           <Row>{pointsToSelectRow}</Row>
//         </Container>
       
//         <Pressable
//           onPress={() => throwDices()}>
//           <Text  style={styles.throw}>THROW DICES</Text>
//         </Pressable>
        
//       </View>
//       <Footer />
//     </>
//   )
// }