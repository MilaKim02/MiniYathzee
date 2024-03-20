import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#2D4B73',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    margin: 10,
    marginTop: 25,


  },
  footer: {
    marginTop: 20,
    backgroundColor: '#2D4B73',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontFamily: 'Simonetta',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontFamily: 'Simonetta',

    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    //padding: 15,
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
  },
  rowname: {
    fontSize: 20,
    //marginTop: 10,
    padding: 10,
  },
  throw: {
    fontSize: 20,
    marginTop: 70,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#99B4BF',
    width: 160,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 15,
    overflow: 'hidden'




  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: "#2B2B52",
    fontSize: 20
  },

  playername: {
    margin: 20,
    borderWidth: 1,
    borderColor: 'black',
    height: 35,
    marginLeft: 15,
  },
  name: {
    margin: 20,
    fontSize: 20,
  },
  ok: {
    marginLeft: 160,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#99B4BF',
    width: 90,
    height: 30,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 15,
    overflow: 'hidden'
  },
  rules: {
    margin: 20,
 
  },
  rulesTitle: {
    margin: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rulesicon: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  lucky: {
    margin: 20,
    marginLeft: 130,
    fontSize: 25,

  },
  dicesrow: {
    margin: 20,
  }
});
