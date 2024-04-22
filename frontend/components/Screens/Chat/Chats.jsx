import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Navigator,
    AlertIOS,
    Dimensions,
    Image
} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from "./chat";

const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    item: {
        padding: 10,
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#819FF7"
    },
    profileBar: {
        height: 150,
        width,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink"
    },
    emitterUID: {
        color: "#FFF",
        padding: 5,
        fontSize: 25
    },
    button: {
        padding: 5
    }
});

export default function Chats({ navigation, route }) {
    console.log(route);
    const { user, socket, apiUrl } = route.params;
    const { UID, username } = user;
    const [state, setState] = useState({
        users: [{ UID: -1, username: "Loading...", isOnline: false }]
    });

    useEffect(() => {
        socket.on("onUserOnline", newOnlineUID => {
            setState(previousState => ({
                ...previousState, users: previousState.users.map(user => {
                    return user.UID === newOnlineUID ? { ...user, isOnline: true } : user
                })
            }));
            console.log("someone new came in (" + newOnlineUID + "), will update the list to:", updatedUsers);
        });

        socket.on("onUserOffline", UID => {
            setState(previousState => ({
                ...previousState, users: previousState.users.map(user => {
                    return user.UID === UID ? { ...user, isOnline: false } : user
                })
            }));
            console.log("someone left (" + UID + "), will update the list to:", updatedUsers);
        });

        socket.emit("identifyUser", UID);
        socket.on("identifyUser", (error) => {
            if (error) {
                console.log("Error identifying self:", error);
                return;
            }

            console.log("Identified self!");
            axios.get(`${apiUrl}/chats/${UID}`).then((response) => {
                setState(previousState => ({ ...previousState, users: response.data.users }));
                console.log("Updated users list (axios) to:", response.data);
            }).catch(error => {
                console.log(`${apiUrl}/user/list: Error (${error})`);
            });
        })
    }, []);

    const goChat = (targetUser) => {
        navigation.navigate("Chat", {
            socket,
            apiUrl,
            targetUser,
            user,
        });
    }

    const RenderUsers = () => {
        if (state.users == null) {
            return (<>
                <Text style={styles.itemText}>No previous chats were found.</Text>
            </>
            )
        }
        return state.users.map((user, index) => {
            if (user.UID == UID) {
                return false;
            }
            return (
                <View key={index} style={styles.item}>
                    <TouchableHighlight
                        activeOpacity={0}
                        underlayColor="#FFFFFF"
                        style={styles.button}
                        onPress={() => goChat(user)}
                    >
                        <Text style={styles.itemText}>{user.username} ({user.isOnline ? "Online" : "Offline"})</Text>
                    </TouchableHighlight>
                </View>
            );
        });
    }

    return (
        <>
            <View style={styles.profileBar}>
                <Text style={styles.emitterUID}>{username}</Text>
            </View>
            <RenderUsers />
        </>
    );
}