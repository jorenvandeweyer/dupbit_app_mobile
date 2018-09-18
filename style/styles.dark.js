import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loginBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
        backgroundColor: "#32363a",
        height: "100%",
    },
    loginLogo: {
        fontSize: 64,
        fontWeight: "bold",
        color: "#fefefe",
        textAlign: "center",
        marginTop: 80,
        marginBottom: 30,
    },
    loginFields: {
        backgroundColor: "#2B2D31",
        borderColor: "#999999",
        borderWidth: 1,
        borderRadius: 3,
        height: 32,
        width: "70%",
        textAlign: "left",
        color: "#fefefe",
        fontSize: 16,
        margin: 6,
        paddingLeft: 7,
    },
    button: {
        backgroundColor: "#999999",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#999999",
        height: 32,
        width: "70%",
        marginTop: 24,
    },
    buttonText: {
        color: "#444444",
        textAlign: "center",
        margin: 2,
        fontSize: 22,
        fontWeight: "bold",
    }
});

export default styles;
