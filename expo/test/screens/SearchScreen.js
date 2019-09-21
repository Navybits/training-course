import React from "react";
import { View, StatusBar, Image, ScrollView } from "react-native";
import styles from "../styles";
import { TextInput } from "react-native-paper";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import db from "../database";
import firebase from "../firebase/config";
export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: "Search in movies"
  };
  state = {
    searchQuery: "",
    movies: [],
    recentMovies: []
  };
  componentDidMount() {
    this.fillRecentMovies();
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists movies3 (id integer primary key not null, Title text,Year text,Poster text,Type text,imdbID text,searchQueryId integer);"
      );
      tx.executeSql(
        "create table if not exists search_queries (id integer primary key not null, query text);"
      );
      tx.executeSql("select * from movies3", [], (_, { rows: { _array } }) =>
        console.log({ movies: _array })
      );

      tx.executeSql(
        "select * from search_queries",
        [],
        (_, { rows: { _array } }) => console.log({ searchQueries: _array })
      );
    });
  }
  fillRecentMovies() {
    let ref = firebase.firestore().collection("movieDetails");
    ref
      .orderBy("year", "desc")
      .limit(10)
      .onSnapshot(snapshot => {
        let docs = []
        snapshot.forEach((doc)=>{
          docs.push(doc.data())
        })
        this.setState({
          recentMovies: docs
        });
      });
  }
  getMovies(searchQuery) {
    console.log("getting movies");
    let ref = firebase.firestore().collection("movieDetails");
    return new Promise((resolve, reject) => {
      ref
        .where("title", "==", searchQuery)
        .get()
        .then(snapshot => {
          let docs = [];
          let result = snapshot.size;
          snapshot.forEach(doc => {
            docs.push(doc.data());
          });
          resolve(docs);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  render() {
    let { recentMovies = [] } = this.state;
    return (
      <ScrollView>
        <View style={[styles.container, { justifyContent: "flex-start" }]}>
          <StatusBar barStyle="default" />
          <TextInput
            label="Search for movie"
            mode="outlined"
            style={styles.textInput}
            value={this.state.searchQuery}
            onChangeText={text => {
              this.setState({ searchQuery: text });
            }}
            onSubmitEditing={({
              nativeEvent: { text, eventCount, target }
            }) => {
              this.getMovies(text)
                .then(responseJson => {
                  // fetch(`http://localhost:9000/app/movies?search=${text}`)
                  //   .then(response => response.json())
                  //   .then(responseJson => {
                  console.log({ responseJson });
                  let result = responseJson;
                  if (!result || result.length == 0) return;
                  this.setState({
                    movies: result
                  });
                  db.transaction(tx => {
                    tx.executeSql(
                      "insert into search_queries (query) values (?)",
                      [text],
                      (_, { insertId }) => {
                        result.forEach(movie => {
                          tx.executeSql(
                            "insert into movies3 (Title,Year,Poster,Type,imdbID,searchQueryId) values (?, ?, ?, ?, ?,?)",
                            [
                              movie.title,
                              movie.year,
                              movie.poster,
                              movie.type,
                              movie.imdb.id,
                              insertId
                            ],
                            console.log,
                            console.log
                          );
                        });
                      }
                    );

                    tx.executeSql(
                      "select * from movies3",
                      [],
                      (_, { rows: { _array } }) =>
                        console.log({ movies: _array })
                    );
                    // });
                  });
                })
                .catch(error => {
                  console.error(error);
                });
              //
            }}
          />
          <View style={{ width: "100%" }}>
            {recentMovies.map((movie, index) => (
              <Card
                key={`movie-list-item-${index}`}
                style={{ marginBottom: 20 }}
              >
                <Card.Content>
                  <Title>{movie.title}</Title>
                  <Paragraph>Released On {movie.year}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: movie.poster }} />
              </Card>
            ))}
            {this.state.movies.map((movie, index) => (
              <Card
                key={`movie-list-item-${index}`}
                style={{ marginBottom: 20 }}
              >
                <Card.Content>
                  <Title>{movie.title}</Title>
                  <Paragraph>Released On {movie.year}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: movie.poster }} />
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}
