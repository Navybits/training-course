import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import SignUpScreen from "./screens/SignUpScreen";
import { Provider, connect } from "react-redux";
const Store = require("./redux/store").default();
let { store, persistor } = Store;
import { PersistGate } from "redux-persist/integration/react";
import "./database";
import styles from "./styles";
import HomeScreen from "./screens/ProfileScreen";
import ChattingRoomScreen from "./screens/ChattingScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchQueriesHistory from "./screens/SearchQueriesHistory";
import SearchMoviesHistory from "./screens/SearchMoviesHistory";
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Other: SearchScreen,
  QueryHistory: SearchQueriesHistory,
  MoviesHistory: SearchMoviesHistory,
  ChattingRoom: ChattingRoomScreen
});
const AuthStack = createStackNavigator({ SignUp: SignUpScreen });

const APP = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <APP />
        </PersistGate>
      </Provider>
    );
  }
}
