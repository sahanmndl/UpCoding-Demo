import {TouchableOpacity, Text, View, Linking, Platform, StyleSheet, Dimensions, Image} from "react-native";
import Colors from "../constants/Colors";

const ContestItem = ({item}) => {

    const {name, url, start_time, end_time, site, status} = item

    return (
        <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(url.toString())}>
            <View style={styles.titleBar}>
                <Image
                    style={styles.imageTitle}
                    source={site === "CodeChef" ? require('../../assets/codechef.png') :
                        site === "CodeForces" ? require('../../assets/codeforces.png') :
                            site === "AtCoder" ? require('../../assets/atcoder.png') :
                                site === "TopCoder" ? require('../../assets/topcoder.png') :
                                    site === "HackerRank" ? require('../../assets/hackerrank.png') :
                                        site === "HackerEarth" ? require('../../assets/hackerearth.png') :
                                            site === "LeetCode" ? require('../../assets/leetcode.png') :
                                                site === "Kick Start" ? require('../../assets/google.png') :
                                                    require('../../assets/coding.png')}
                    defaultSource={require('../../assets/coding.png')}
                />
                <Text style={styles.title} numberOfLines={3}>
                    {name}
                </Text>
            </View>
            <Text style={styles.site} numberOfLines={1}>
                {site}
            </Text>
            <Text style={styles.time} numberOfLines={1}>
                Start Time - {start_time}
            </Text>
            <Text style={styles.time} numberOfLines={1}>
                End Time - {end_time}
            </Text>
            <View style={styles.statusBar}>
                {status === "CODING" ?
                    <Image
                        style={styles.imageLive}
                        source={require('../../assets/live.png')}
                    /> :
                    <Image
                        style={styles.imageTime}
                        source={require('../../assets/time.png')}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}

export default ContestItem

const WIDTH = Dimensions.get("window").width

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingStart: 8,
        paddingEnd: 8,
        borderRadius: 8,
        marginTop: 8,
        width: Platform.OS === 'web' ? WIDTH * 0.5 : WIDTH - 20,
        backgroundColor: "#FFF",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
    },
    titleBar: {
        flexDirection: "row"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: Colors.LINK_BLUE,
        marginStart: 10
    },
    site: {
        fontSize: 15,
        marginVertical: 8,
        fontWeight: "700"
    },
    time: {
        fontSize: 15,
        marginVertical: 8,
    },
    statusBar: {
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    status: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.RED,
    },
    imageLive: {
        height: 20,
        width: 20
    },
    imageTime: {
        height: 17,
        width: 17
    },
    imageTitle: {
        height: 24,
        width: 24
    }
})