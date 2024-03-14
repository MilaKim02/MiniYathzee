import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
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
    marginTop: 20,
    padding: 20
  },
  rowname: {
    fontSize:20,
    //marginTop: 10,
    padding: 10,
  },
  throw: {
fontSize:20,
marginTop: 20,
padding: 10
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
    color:"#2B2B52",
    fontSize: 20
  },

  playername: {
    margin:20,
    borderWidth: 1,
    borderColor: 'black',
    height:35,
    marginLeft:15,
  },
  name: {
    margin:20,
  },
  ok:{
    marginLeft: 160,
    marginTop:20,
    borderWidth: 1,
    borderColor: 'black',
    width:90,
    height: 30,
    textAlign:'center',
    fontSize:20,
  },
   rules: {
    margin:20,
   },
   lucky:{
    margin:20,
    marginLeft: 130,
    fontSize: 25,

   }
});
