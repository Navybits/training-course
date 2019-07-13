import React from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import {
  Avatar,
  Button,
  Checkbox,
  TouchableRipple,
  Paragraph
} from "react-native-paper";
class CheckboxComponent extends React.Component {
  state = {
    checked: false
  };

  render() {
    const { checked } = this.state;
    return (
      <TouchableRipple
        onPress={() =>
          this.setState(state => ({
            checkedCustom: !state.checkedCustom
          }))
        }
      >
        <View style={styles.row}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center"
            }}
            pointerEvents="none"
          >
            <Checkbox
              color={"green"}
              status={this.state.checkedCustom ? "checked" : "unchecked"}
            />
            <Paragraph style={{ fontSize: 15 }}>Do not show again</Paragraph>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}
const ButtonComponent = props => {
  return (
    <Button
      style={{ marginTop: 30, width: "90%" }}
      mode="contained"
      color="red"
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 30 }}>Get Started</Text>
    </Button>
  );
};
var screenWidth = Dimensions.get("window").width;
const MyComponent = () => (
  <Avatar.Image
    size={screenWidth * 0.6}
    source={require("../assets/images/logo.png")}
  />
);

export default class Login extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MyComponent />
        <ButtonComponent
          onPress={() => this.props.navigation.navigate("Main")}
        />
        <CheckboxComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 8
  },

  row: {
    width: "100%",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16
  }
});
