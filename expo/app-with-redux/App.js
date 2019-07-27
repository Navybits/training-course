import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider, connect } from "react-redux";
import store from "./redux/store";
import CounterButton from "./components/CounterButton";
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <CounterButton />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
