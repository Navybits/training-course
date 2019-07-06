import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Card extends React.Component {
  render() {
    let { imageUri = "", text = "" } = this.props;
    return (
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          resizeMode={"contain"}
          source={{
            uri: imageUri
          }}
        />
        <Text style={styles.cardText}>
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    marginTop: 5,
    color: "#444"
  },
  cardImage: {
    // backgroundColor:"red",
    width: screenWidth - 60,
    padding: 10,
    height: 100
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: screenWidth - 20,
    borderWidth: 1,
    padding: 20,
    borderColor: "gray",
    borderRadius: 3,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 2
  }
});
