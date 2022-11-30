import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    imageBackground: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: "relative",
        top: 0,
        left: 0,
        right: 0,
        flex: 1,
        bottom: 0,
        zIndex: -1,
    }
}) 