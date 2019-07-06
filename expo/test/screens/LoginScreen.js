import React from "react";
import { View, Button } from "react-native";
export default class Login extends React.Component {
  render() {
    console.log(this.props.navigation);
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Main")}
        />
      </View>
    );
  }
}
