import { StyleSheet } from "react-native";

export default StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingRight: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        zIndex: 9,
        elevation: 9
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitleLabel: {
        // fontFamily: "Mulish-Bold",
        fontSize: 22,
        paddingVertical: 20
    },
    headerIcon: {
        margin: 24
    }
})