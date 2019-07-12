import React from "react";
import { View, Dimensions, Text } from "react-native";
import { Avatar, Button } from "react-native-paper";

const ButtonComponent = (props) => {
  return (
  <Button
    style={{ marginTop: 30, width: "90%" }}
    mode="contained"
    color="red"
    onPress={props.onPress}
  >
    <Text style={{ fontSize: 30 }}>Press me</Text>
  </Button>
)};
var screenWidth = Dimensions.get("window").width;
const MyComponent = () => (
  <Avatar.Image
    size={screenWidth * 0.6}
    source={require("../assets/images/logo.png")}
  />
);

export default class Login extends React.Component {
  render() {
    console.log(this.props.navigation);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MyComponent />
        <ButtonComponent
          onPress={() => this.props.navigation.navigate("Main")}
        />
      </View>
    );
  }
}
