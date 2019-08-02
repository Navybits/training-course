import React from "react";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";
import * as userActions from "../redux/actions/userData";
import styles from "../styles";
import TextInput from "../components/TextInput";
class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };
  state = {
    name: ""
  };
  componentWillReceiveProps(nextProps) {
    let newUserData = nextProps.userData,
      oldUserData = this.props.userData;
    if (!oldUserData.name && newUserData && newUserData.name) {
      this.props.navigation.navigate("App");
    }
  }
  render() {
    return (
      <View>
        <TextInput
          label="Name"
          onChange={text => {
            this.setState({ name: text });
          }}
        />
        {/* <Text>{this.props.userData.name}</Text> */}
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    console.log("calling dispatch action", this.state);
    // await AsyncStorage.setItem("userToken", "abc");
    // this.props.navigation.navigate("App");
    this.props.setUserDataInRedux({ name: this.state.name });
  };
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDataInRedux: data => {
      console.log("inside setUserDataInRedux");
      dispatch(userActions.set_user_data(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
