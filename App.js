import React from 'react';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import { StyleSheet, Text, View,TouchableOpacity,Alert,Button } from 'react-native';
import react from 'react';
import { addValidStylePropTypes } from 'react-native/Libraries/StyleSheet/StyleSheetValidation';

export default class App extends react.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,

    }
  }
  componentDidMount() {
    this.initializeGame();
  }
  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    })
  }
  onTilePress = (row, col) => {
    var currentPlayer = this.state.currentPlayer;
    var gameState = this.state.gameState.slice();
    if (gameState[row][col] !== 0) {
      return;
    }
    gameState[row][col] = currentPlayer;
    this.setState({
      gameState: gameState,
      currentPlayer: -currentPlayer
    });
    var winner = this.checkWinner();
    if (winner == 1) {
      Alert.alert("Player 1 wins!");
      this.initializeGame();
    }
    else if (winner == -1) {
      Alert.alert("Player 2 wins!");
      this.initializeGame();
    }
}

  checkWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;
    //check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {return 1;}
      else if (sum === -3) {return -1;}
    }
    //check cols
    for (var i = 0; i < NUM_TILES; i++) { 
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) {return 1;}
      else if (sum === -3) {return -1;}
    //check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) {return 1;}
    else if (sum === -3) {return -1;}
    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum === 3) {return 1;}
    else if (sum === -3) {return -1;}
  }
  //no winners
  return 0;
}

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.x} />
      case -1:
        return <Icon name="circle-outline" style={styles.o} />
      default:
        return <View />
  }
}

  render(){
    return(
    <View style={styles.container}>
      
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth : 0 , borderTopWidth : 0}]}>
        {this.renderIcon(0, 0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth : 0}]}>
        {this.renderIcon(0, 1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, {borderTopWidth : 0 , borderRightWidth : 0}]}>
        {this.renderIcon(0, 2)}
      </TouchableOpacity>
      </View>

      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth : 0}]}>
        {this.renderIcon(1, 0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={[styles.tile, {}]}>
        {this.renderIcon(1, 1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth : 0}]}>
        {this.renderIcon(1, 2)}
      </TouchableOpacity>
      </View>

      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile, {borderLeftWidth : 0, borderBottomWidth : 0}]}>
        {this.renderIcon(2, 0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile, {borderBottomWidth : 0}]}>
        {this.renderIcon(2, 1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, {borderBottomWidth : 0 , borderRightWidth : 0}]}>
        {this.renderIcon(2, 2)}
      </TouchableOpacity>
      </View>
      
      <View style={{padding: 50}}/>
      <Button title="Reset" onPress={this.initializeGame}/>

    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile : {
    borderWidth: 5,
    width: 100,
    height: 100,
  },
  x : {
    color : "black",
    fontSize : 100,
    
  },
  o : {
    color : "black",
    fontSize : 90,
  }
});
