import React from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import counterActions from "../redux/actions/counter";
class CounterButton extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log({ nextProps, oldProps: this.props });
  }
  render() {
    let counter = this.props.counter;
    console.log("new value of the counter is received:", counter);
    return (
      <View>
        <Button
          title="Increment"
          onPress={() => {
            this.props.dispatchIncrement();
          }}
        />
        <Button
          title="Decrement"
          onPress={() => {
            this.props.dispatchDecrement();
          }}
        />
        <Text>Current counter value is now: {counter}</Text>
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    counter: state.counter
  };
};
const mapDispatchToProps = dispatch => ({
  dispatchIncrement: () => dispatch(counterActions.increment()),
  dispatchDecrement: () => dispatch(counterActions.decrement())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterButton);
