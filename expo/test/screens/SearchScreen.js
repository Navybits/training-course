import React from "react";
import { View, StatusBar, Image, ScrollView } from "react-native";
import styles from "../styles";
import { TextInput } from "react-native-paper";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import db from "../database";
export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: "Search in movies"
  };
  state = {
    searchQuery: "",
    movies: []
  };
  componentDidMount() {
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

      tx.executeSql("select * from search_queries", [], (_, { rows: { _array } }) =>
        console.log({ searchQueries: _array })
      );
    });
  }

  render() {
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
              fetch(`http://www.omdbapi.com/?apikey=4ec0b62b&s=${text}`)
                .then(response => response.json())
                .then(responseJson => {
                  console.log({ responseJson });
                  let result = responseJson.Search;
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
                              movie.Title,
                              movie.Year,
                              movie.Poster,
                              movie.Type,
                              movie.imdbID,
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
                  });
                })
                .catch(error => {
                  console.error(error);
                });
              //
            }}
          />
          <View style={{ width: "100%" }}>
            {this.state.movies.map((movie, index) => (
              <Card
                key={`movie-list-item-${index}`}
                style={{ marginBottom: 20 }}
              >
                <Card.Content>
                  <Title>{movie.Title}</Title>
                  <Paragraph>Released On {movie.Year}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: movie.Poster }} />
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}
