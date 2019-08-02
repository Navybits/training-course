import React from "react";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../styles";
import TextInput from "../components/TextInput";
import * as userActions from "../redux/actions/userData";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome to the app!"
  };
  componentWillReceiveProps(nextProps) {
    let newUserData = nextProps.userData,
      oldUserData = this.props.userData;
    if (!nextProps.name && oldUserData && oldUserData.name) {
      this.props.navigation.navigate("Auth");
    }
  }
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>Welcome {this.props.userData.name}</Text>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    this.props.resetUserDataInRedux();
    // await AsyncStorage.clear();
    // this.props.navigation.navigate("Auth");
  };
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetUserDataInRedux: () => {
      dispatch(userActions.set_user_data({}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
