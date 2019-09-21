import React from "react";
import { View, StatusBar, Image, ScrollView } from "react-native";
import styles from "../styles";
import { TextInput } from "react-native-paper";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import db from "../database";
import firebase from "../firebase/config";
import { connect } from "react-redux";
class ChattingScreen extends React.Component {
  static navigationOptions = {
    title: "Chatting Room"
  };
  state = {
    message: "",
    messages: []
  };
  componentDidMount() {
    this.fillMessages.bind(this)();
  }
  submitMessage(message = "") {
    if (message && message != "") {
      let ref = firebase.firestore().collection("messages");
      ref.doc().set({
        text: message,
        create_date: new Date(),
        user: this.props.userData.email
      });
      this.setState({ message: "" });
    }
  }
  fillMessages() {
    let { messages = [] } = this.state;
    let ref = firebase.firestore().collection("messages");
    ref.orderBy("create_date").onSnapshot(snapshot => {
      let docs = messages;
      // docs.reverse();
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          console.log("New message: ", change.doc.data());
          // console.log({ messages });
          docs.push(change.doc.data());
        }
        // if (change.type === "modified") {
        //   console.log("New message: ", change.doc.data());
        //   // console.log({ messages });
        //   docs[change.doc.id] = change.doc.data();
        //   // messages = messages
        //   //   .reverse()
        //   //   .push(change.doc.data())
        //   //   .reverse();
        // }
      });
      // docs.reverse();
      this.setState({
        messages: docs
      });
    });
  }

  render() {
    let { messages = [] } = this.state;
    console.log({ messages });
    let _messages = [...messages];
    return (
      <ScrollView>
        <View style={[styles.container, { justifyContent: "flex-start" }]}>
          <StatusBar barStyle="default" />
          <TextInput
            label="Add your message here"
            mode="outlined"
            style={styles.textInput}
            value={this.state.message}
            onChangeText={text => {
              this.setState({ message: text });
            }}
            onSubmitEditing={({
              nativeEvent: { text, eventCount, target }
            }) => {
              this.submitMessage(text);
              //
            }}
          />
          <View style={{ width: "100%" }}>
            {_messages.reverse().map((message, index) => {
              return message.create_date ? (
                <Card
                  key={`message-list-item-${index}`}
                  style={{ marginBottom: 20 }}
                >
                  <Card.Content>
                    <Title>{message.text}</Title>
                    <Paragraph>
                      Sent On {message.create_date.toDate().toLocaleString()}
                    </Paragraph>
                    <Paragraph>By {message.user || ""}</Paragraph>
                  </Card.Content>
                </Card>
              ) : null;
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChattingScreen);
