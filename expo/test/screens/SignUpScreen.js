import React from "react";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";
import * as userActions from "../redux/actions/userData";
import styles from "../styles";
// import TextInput from "../components/TextInput";
import { TextInput } from "react-native-paper";
import ImagePickerExample from "../components/imagePicker";
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
    if (newUserData && newUserData.name) {
      this.props.navigation.navigate("App");
    }
  }
  componentDidMount() {
    let oldUserData = this.props.userData;
    if (oldUserData && oldUserData.name) {
      this.props.navigation.navigate("App");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImagePickerExample onSelect={uri => this.setState({ uri })} />
        <TextInput
          label="Name"
          mode="outlined"
          style={styles.textInput}
          value={this.state.name}
          onChangeText={text => {
            this.setState({ name: text });
          }}
        />
        <TextInput
          label="Email"
          mode="outlined"
          style={styles.textInput}
          value={this.state.email}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          style={styles.textInput}
          value={this.state.password}
          onChangeText={text => {
            this.setState({ password: text });
          }}
        />
        <Text>{this.props.userData.name}</Text>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    console.log("calling dispatch action", this.state);
    // await AsyncStorage.setItem("userToken", "abc");
    // this.props.navigation.navigate("App");
    this.props.setUserDataInRedux(this.state);
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
