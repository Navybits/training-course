import React from "react";
import { View, Button, Text, Image } from "react-native";
import { connect } from "react-redux";
import styles from "../styles";
import TextInput from "../components/TextInput";
import * as userActions from "../redux/actions/userData";
import db from "../database";
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome to the app!"
  };
  state = {
    userData: {},
    movies: []
  };

  componentDidMount() {
    let self = this;
    db.transaction(
      tx => {
        tx.executeSql(
          "select * from users where email = ?",
          [this.props.userData.email],
          (_, { rows }) => {
            // console.log({ rows, item: rows.item(0) });
            self.setState({ userData: rows.item(0) });
          }
        );
      },
      console.log,
      console.log
    );
  }
  componentWillReceiveProps(nextProps) {
    let newUserData = nextProps.userData,
      oldUserData = this.props.userData;
    if (!nextProps.name && oldUserData && oldUserData.name) {
      this.props.navigation.navigate("Auth");
    }
  }
  render() {
    // console.log(this.state);
    return (
      <View style={styles.container}>
        {this.state.userData ? (
          <>
            <Text style={{ textAlign: "center" }}>
              Welcome {this.state.userData.name}
            </Text>
            <Text style={{ textAlign: "center" }}>
              You are logged in as {this.state.userData.email}
            </Text>
            <Image
              source={{ uri: this.state.userData.image }}
              style={{ width: 200, height: 200 }}
            />
          </>
        ) : null}
        {(this.state.movies || []).map((movie, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20 }}>
              {movie.id}){movie.title}
            </Text>
            <Text>{":"}</Text>
            <Text style={{ fontSize: 18 }}>{movie.releaseYear}</Text>
          </View>
        ))}
        <Button title="Search in movies" onPress={this._showMoreApp} />
        <Button
          title="View search history"
          onPress={() => this.props.navigation.navigate("QueryHistory")}
        />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    let self = this;
    console.log(
      `removing my account ${this.props.userData.email} : ${
        this.props.userData.id
      }`
    );
    db.transaction(
      tx => {
        tx.executeSql(`delete from users where id=?;`, [
          this.props.userData.id
        ]);
      },
      console.log,
      () => {
        db.transaction(tx => {
          tx.executeSql("select * from users", [], (_, { rows }) => {
            // console.log(JSON.stringify(rows));
          });
        });
        self.props.resetUserDataInRedux();
      }
    );
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
