import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native'

export default class App extends React.Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={styles.animationContainer}>
        <Lottie
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: '#eee',
          }}
          source={require('../assets/3532-car.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={this.resetAnimation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    marginTop:150,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});