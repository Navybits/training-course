import React from "react";
import { View, Text, Button } from "react-native";

export default class InternalScreen extends React.Component {
  render() {
    let params =
      (this.props &&
        this.props.navigation &&
        this.props.navigation.state &&
        this.props.navigation.state.params) ||
      {};
    return (
      <View
        style={{
          padding: 10,
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Congratulations {params.name}!!</Text>
        <Text>
          Your request has been submitted, we will send you invitation to your
          email {params.email}
        </Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
