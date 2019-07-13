import * as React from "react";
import { TextInput } from "react-native-paper";

export default class MyComponent extends React.Component {
  state = {
    text: ""
  };

  render() {
    let { onChange } = this.props;
    return (
      <TextInput
        label={this.props.label || ""}
        value={this.state.text}
        style={{ marginBottom: 10 }}
        onChangeText={text =>
          this.setState({ text }, () => {
            if (typeof onChange == "function") onChange(text);
          })
        }
      />
    );
  }
}
