import React from "react";
import { ScrollView, View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import db from "../database";

export default class SearchMoviesHistory extends React.Component {
  state = {
    movies: []
  };
  static navigationOptions = {
    title: "Movies history"
  };
  componentDidMount() {
    let {
      navigation: {
        state: {
          params: { searchQuery }
        }
      }
    } = this.props;
    db.transaction(tx => {
      tx.executeSql(
        "select * from movies3 where searchQueryId = ?",
        [searchQuery.id],
        (_, { rows: { _array } }) => {
          this.setState({ movies: _array });
        },
        console.log
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <ScrollView>
        <View style={{ width: "100%" }}>
          {this.state.movies.map((movie, index) => (
            <Card key={`movie-list-item-${index}`} style={{ marginBottom: 20 }}>
              <Card.Content>
                <Title>{movie.Title}</Title>
                <Paragraph>Released On {movie.Year}</Paragraph>
              </Card.Content>
              <Image
                resizeMode={"contain"}
                style={{ width: "100%", height: 200 }}
                source={{ uri: movie.Poster }}
              />
            </Card>
          ))}
        </View>
      </ScrollView>
    );
  }
}
