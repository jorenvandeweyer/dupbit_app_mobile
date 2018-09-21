import { StyleSheet } from 'react-native';

const BG_COLOR = "#32363a";
const BG_COLOR_2 = "#2B2D31";
const BUTTON_COLOR = "#444444";

const FOOTER_BG_COLOR = "#2B2D31";
const FOOTER_BORDER = "#252525";

const DEVICE_BG_COLOR = "#868383";

export const device = StyleSheet.create({
    body: {
        backgroundColor: DEVICE_BG_COLOR,
        height: 90,
        width: "92%",
        alignSelf: "center",
        margin: 6,
        borderRadius: 20,
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#F24444",
        marginTop: 15,
        marginLeft: 20,
        marginBottom: 10,
    },
    online: {
        backgroundColor: "#33CB05",
    },
    title: {
        position: 'absolute',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 60,
    },
    key: {
        left: 20,
    },
    value: {
        left: 60,
        position: 'absolute',
    },
    header: {
        borderRadius: 1,
        backgroundColor: BG_COLOR_2,
        borderColor: FOOTER_BORDER,
        borderWidth: 1,
        width: "100%",
        height: 64,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#53575C',
    },
});

export const footer = StyleSheet.create({
    body: {
        width: "100%",
        height: 48,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: FOOTER_BG_COLOR,
        borderWidth: 1,
        borderColor: FOOTER_BORDER,

        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export const defaults = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: BG_COLOR,
    },
    row: {
        flexDirection: "row",
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
        backgroundColor: BG_COLOR_2,
        borderTopWidth: 1,
        borderTopColor: "#252525",
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
        height: 42,
    },
    searchBar: {
        backgroundColor: BG_COLOR,
        borderBottomColor: "transparent",
        borderTopColor: 'transparent'
    },
});
