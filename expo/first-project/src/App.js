import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Card from "../components/card";
import styles from "../styles";
import Banner from "../components/Banner"
import AppBar from "../components/AppBar";
import LottieCar from "../components/LottieCar"

// import HomeScreen from "./screens/home"
export default function App() {
  // return (<HomeScreen />)
  const articles = [
    {
      image: "https://navybits.com/web/image/res.company/1/logo?unique=df329c7",
      title: "This is my text!!!!"
    },
    {
      image: "https://navybits.com/web/image/res.company/1/logo?unique=df329c7",
      title: "This is my text!!!!"
    },
    {
      image: "https://navybits.com/web/image/res.company/1/logo?unique=df329c7",
      title: "This is my text!!!!"
    },
    {
      image: "https://navybits.com/web/image/res.company/1/logo?unique=df329c7",
      title: "This is my text!!!!"
    },
    {
      image: "https://navybits.com/web/image/res.company/1/logo?unique=df329c7",
      title: "This is my text!!!!"
    },
    {
      image: "https://navybits.com/web/image/res.company/1/logo?unique=df329c7",
      title: "This is my text!!!!"
    }
  ];
  return (
    <>
      <LottieCar />
      <ScrollView style={styles.ScrollView}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!!!!</Text>
          {articles.map(function(article, index) {
            console.log({ article, index });
            return (
              <Card
                key={"card" + index}
                imageUri={article.image}
                text={article.title}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
