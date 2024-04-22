import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";

const backImage = require("./../../../assets/back.png");

const styles = StyleSheet.create({
  barWrap: {
    marginTop: 20,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "#D2D2D2",
    borderTopColor: "#FFF",
    borderLeftColor: "#FFF",
    borderRightColor: "#FFF"
  },
  itemBar: {
    flex: 1,
    alignItems: "center"
  },
});

export default class topBar extends Component {
  render() {
    return (
      <View style={styles.barWrap}>
        <View style={styles.itemBar}>
          <Text>{this.props.title}</Text>
          {this.props.renderSubtitleComponent && this.props.renderSubtitleComponent()}
        </View>

        <View style={styles.itemBar}>
          <Text />  
        </View>
      </View>
    );
  }
}
