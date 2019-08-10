import React from "react";

import { ScrollView, View, Text, Button } from "react-native";

import db from "../database";
// import { Button } from "react-native-paper";

export default class SearchQueriesHistory extends React.Component {
  state = {
    searchQueries: []
  };
  static navigationOptions = {
    title: "Search history"
  };
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "select * from search_queries order by id desc",
        [],
        (_, { rows: { _array } }) => {
          this.setState({ searchQueries: _array });
        },
        console.log
      );
    });
  }
  render() {
    let { searchQueries } = this.state;
    return (
      <ScrollView>
        {searchQueries.map((searchQuery, index) => (
          <View
            key={`search-query-${index}`}
            style={{
              padding: 10,
              borderBottomColor: "#ededed",
              borderBottomWidth: 1
            }}
          >
            <Button
              title={searchQuery.query}
              onPress={() =>
                this.props.navigation.navigate("MoviesHistory", { searchQuery })
              }
            />
          </View>
        ))}
      </ScrollView>
    );
  }
}
