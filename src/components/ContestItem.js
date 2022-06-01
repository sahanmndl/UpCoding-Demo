import {TouchableOpacity, Text, View, Linking, Platform, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const ContestItem = ({item}) => {

    const {name, url, start_time, end_time, site, status} = item

    return (
        <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(url.toString())}>
            <Text style={styles.title} numberOfLines={3}>
                {name}
            </Text>
            <Text style={styles.site} numberOfLines={1}>
                {site}
            </Text>
            <Text style={styles.site} numberOfLines={1}>
                Start Time - {start_time}
            </Text>
            <Text style={styles.site} numberOfLines={1}>
                End Time - {end_time}
            </Text>
            <View style={styles.statusBar}>
                <Text style={styles.status} numberOfLines={1}>
                    {status}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ContestItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingStart: 8,
        paddingEnd: 8,
        borderRadius: 8,
        marginVertical: 8,
        width: Platform.OS === 'web' ? "50%" : "100%",
        backgroundColor: "#FFF",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: Colors.LINK_BLUE
    },
    site: {
        fontSize: 15,
        marginVertical: 8
    },
    statusBar: {
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    status: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.RED,
    }
})