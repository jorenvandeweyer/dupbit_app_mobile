import { StyleSheet } from 'react-native';

const BG_COLOR = "#32363a";
const BG_COLOR_2 = "#2B2D31";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: BG_COLOR,
    },
    statusBarHolder: {
        height: 22,
        backgroundColor: BG_COLOR,
    },
    loginBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
        backgroundColor: BG_COLOR,
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
    },
    errorMessage: {
        backgroundColor: "#ff2222",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#ff2222",
        overflow: "hidden",
        textAlign: "center",
        color: "#eeeeee",
        width: "60%",
        marginBottom: 15,
        height: 32,
        fontSize: 22,
    },
    footer: {
        backgroundColor: BG_COLOR,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 48,
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 0,
    },
    footerButton: {
        backgroundColor: BG_COLOR_2,
        margin: 2,
        height: 32,
    },
    searchBar: {
        backgroundColor: BG_COLOR,
        borderBottomColor: "transparent",
        borderTopColor: 'transparent'
    },
    device: {
        margin: 5,
    }
});

export default styles;
