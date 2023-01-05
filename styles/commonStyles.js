import { StyleSheet } from "react-native";

export default StyleSheet.create({
    genericContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    navigation: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: 'row',
    },
    navItem: {
        paddingHorizontal: 5
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        // fontFamily: "Mulish-Bold"
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        // fontFamily: "Mulish-Bold"
    },
    paragraph: {
        color: 'rgba(0,0,0,0.6)',
        paddingVertical: 5,
        // fontFamily: "Mulish-Regular"
    },
    paragraphRed: {
        width: '60%',
        color: '#FF4848',
        opacity: 0.7,
        textAlign: 'center'
    },
    contactsSection: {
        flexDirection: 'row',
        alignItems: 'start',
        paddingTop: 10
    },
    centeredSection: {
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        paddingVertical: 20,
    },
})