import { StyleSheet, Text, View } from "react-native";
export default function Header() {
 return (
 <View style={styles.container}>
 <Text>Welcome Back</Text>
 </View>
 );
}
const styles = StyleSheet.create({
 container: {

 backgroundColor: "pink",
 marginTop: 30,
 alignItems: "center",
 justifyContent: "center",
 width: 400,
 height: 50,
 },
});