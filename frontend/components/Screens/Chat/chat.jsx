import React, { Component, useEffect, useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Dimensions,
  AlertIOS,
  Button
} from "react-native";

import TopBar from "./topBar";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  chatWrap: {
    width,
    height: "100%"
  },
  onlineIndicator: {
    fontSize: 20,
    color: "green"
  },
  subtitleWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
});

export default function Chat({ navigation, route }) {
  const { user, socket, targetUser, apiUrl } = route.params;
  console.log("started chat with: ", targetUser);

  const [state, setState] = useState({
    isTyping: false,
    isOnline: true,
    chat: [
      {
        UID: user.UID,
        targetUID: targetUser.UID,
        message: "Hola",
        date: new Date(Date.UTC(2016, 7, 30, 17, 20, 0))
      }
    ],
    message: "",
    messages: []
  });

  useEffect(() => {
    console.log(apiUrl);
    axios.get(`${apiUrl}/user/${user.UID}/chat/${targetUser.UID}`).then((response) => {
      const { messages } = response.data;
      setState({ ...state, messages});
    }).catch(error => {
      console.log("Couldn't get chat history:", error);
    });

    socket.on("ReceiveMessage", (senderUID, messageRawData) => {
      messageData = {
        text: messageRawData.text,
        user: { _id: senderUID },
        createdAt: messageRawData.createdAt,
        _id: messageRawData._id
      };

      setState(previousState => ({
        ...previousState,
        messages: GiftedChat.append(previousState.messages, messageData)
      }));
    });

    socket.on("typing", (targetUID) => {
      if (targetUID === targetUser.UID)
        setState(previousState => ({ ...previousState, isTyping: true }));
    });

    socket.on("stop-typing", (targetUID) => {
      if (targetUID === targetUser.UID)
        setState(previousState => ({ ...previousState, isTyping: false }));
    });
  }, []);

  const handleInputChange = (messageText) => {
    if (messageText && messageText.trim()) {
      socket.emit("typing", user.UID, targetUser.UID);
    } else {
      socket.emit("stop-typing", user.UID, targetUser.UID);
    }
  }

  const getSubtitleText = (isOnline, isTyping) => {
    if (isTyping) {
      return "typing...";
    } else if (isOnline) {
      return "online";
    }
  }

  const getSubtitleComponent = () => {
    const { isTyping } = state;
    if (!targetUser.isOnline)
      return <View />;

    return (
      <View style={styles.subtitleWrapper}>
        {!isTyping && <Text style={styles.onlineIndicator}>{" • "}</Text>}
        <Text>{getSubtitleText(targetUser.isOnline, isTyping)}</Text>
      </View>
    );
  }

  const onSend = (messages = []) => {
    setState(previousState => ({
      ...previousState,
      messages: GiftedChat.append(previousState.messages, messages)
    }));


    socket.emit("stop-typing", user.UID, targetUser.UID);
    socket.emit("SendMessage", user.UID, targetUser.UID, messages[0]);
  }

  const goBack = () => {
    socket.emit("stop-typing", user.UID, targetUser.UID);
    //this.props.navigator.pop();
  }

  return (
    <View style={styles.chatWrap}>
      {<TopBar
        title={targetUser.username}
        renderSubtitleComponent={getSubtitleComponent}
        onGoBack={goBack}
      />}
      <GiftedChat
        style={{ borderWidth: 1 }}
        messages={state.messages}
        onSend={onSend}
        onInputTextChanged={handleInputChange}
        user={{
          _id: user.UID
        }}
      />
    </View>
  );
}
