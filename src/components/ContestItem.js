import {TouchableOpacity, Text, View, Linking, Platform, StyleSheet, Dimensions, Image} from "react-native";
import Colors from "../constants/Colors";
import { google } from "calendar-link";

const ContestItem = ({item}) => {

    const {name, url, start_time, end_time, site, status} = item

    const addEventToCalender = {
        title: name,
        start: start_time,
        end: end_time
    }

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
            <View style={styles.timeBar}>
                <Image
                    style={styles.imageStart}
                    source={require('../../assets/shuttle.png')}
                />
                <Text style={styles.time} numberOfLines={1}>
                    {site === "CodeChef" ? `${start_time} + 05:30:00 (IST)` :
                        `${new Date(start_time).toString()}`}
                </Text>
            </View>
            <View style={styles.timeBar}>
                <Image
                    style={styles.imageStop}
                    source={require('../../assets/finish-flag.png')}
                />
                <Text style={styles.time} numberOfLines={1}>
                    {site === "CodeChef" ? `${end_time} + 05:30:00 (IST)` :
                        `${new Date(end_time).toString()}`}
                </Text>
            </View>
            <View style={styles.statusBar}>
                <TouchableOpacity
                    style={styles.buttonAddToCalender}
                    title="Add"
                    onPress={() => Linking.openURL(google(addEventToCalender))}
                >
                    <Image
                        style={styles.imageCalender}
                        source={require('../../assets/add_to_calendar_2.png')}
                    />
                </TouchableOpacity>
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
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
        width: Platform.OS === 'web' ? WIDTH <= 760 ? WIDTH - 20 : WIDTH * 0.5 : WIDTH - 20,
        backgroundColor: "#FFF",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
    },
    titleBar: {
        flexDirection: "row",
        alignItems: "center"
    },
    timeBar: {
        flexDirection: "row",
        alignItems: "center",       //center vertical items inside view
        marginVertical: 8
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
        marginStart: 10
    },
    statusBar: {
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    status: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.RED,
    },
    imageStart: {
        height: 18,
        width: 18
    },
    imageStop: {
        height: 19,
        width: 19
    },
    imageLive: {
        height: 20,
        width: 20,
        marginStart: 15
    },
    imageTime: {
        height: 17,
        width: 17,
        marginStart: 15
    },
    imageTitle: {
        height: 24,
        width: 24
    },
    imageCalender: {
        height: 23,
        width: 23
    },
    buttonAddToCalender : {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        padding: 10
    }
})