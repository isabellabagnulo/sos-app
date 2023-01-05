import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        position: 'relative',
    },
    contactLabel: {
        fontSize: 16,
    },
    contactLabelDisable: {
        fontSize: 16,
        opacity: 0.3
    },
    errorContainer: {
        borderRadius: 5,
        width: '30%',
        backgroundColor: 'white',
        padding: 5,
        position: 'absolute',
        right: 60
    },
    errorLabel:{
        fontSize: 10,
        textAlign: 'center',
    },

    contactCircleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        padding: 5
    },
    circleContainer: {
        paddingHorizontal: 13,
        paddingVertical: 12,
        backgroundColor: 'rgba(255, 72, 72, 0.7)',
        borderRadius: '50%'
    },
    circleContainerImage: {
        borderRadius: '50%',
        width: 40,
        height: 40,
        overflow: 'hidden'
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: "50%"
    },
    contactCircleLabel: {
        textAlign: 'center',
        fontSize: 12
    }
})