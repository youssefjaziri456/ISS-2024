import { StyleSheet, Text, View } from "react-native";
export default function Footer() {
 return (
 <View style={styles.container}>
 <Text>All rights reserved by PawPaw,2024 </Text>
 </View>
 );
}
const styles = StyleSheet.create({
 container: {
 backgroundColor: "#d3d3d3",
 alignItems: "center",

 justifyContent: "center",
 width: 400,
 height: 50,
 },
});