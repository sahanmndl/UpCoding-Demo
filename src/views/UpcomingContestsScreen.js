import React, {useEffect, useState} from "react";
import {View, StyleSheet, ActivityIndicator, FlatList, Dimensions, Platform, Image, Text} from "react-native";
import Colors from "../constants/Colors";
import ContestItem from "../components/ContestItem";
import {Picker} from "@react-native-picker/picker";

const UpcomingContestsScreen = () => {

    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState()

    const fetchAllContests = async () => {
        try {
            const response = await fetch(`https://kontests.net/api/v1/all`)
            const json = await response.json()
            setOriginalData([...json])
        } catch (e) {
            console.log(e)
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

    useEffect(() => {
        fetchAllContests()
    }, [])

    const noResultsDisplay = () => {
        return (
            <View style={styles.noResultContainer}>
                <Image
                    style={styles.noResultImage}
                    source={require('../../assets/cross.png')}
                />
                <Text style={styles.noResultText}>
                    No Results!
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={filter}
                    onValueChange={(val, index) => setFilter(val)}
                >
                    <Picker.Item label="All" value="All"/>
                    <Picker.Item label="CodeChef" value="CodeChef"/>
                    <Picker.Item label="CodeForces" value="CodeForces"/>
                    <Picker.Item label="AtCoder" value="AtCoder"/>
                    <Picker.Item label="TopCoder" value="TopCoder"/>
                    <Picker.Item label="HackerRank" value="HackerRank"/>
                    <Picker.Item label="HackerEarth" value="HackerEarth"/>
                    <Picker.Item label="LeetCode" value="LeetCode"/>
                    <Picker.Item label="Kick Start" value="Kick Start"/>
                </Picker>
            </View>
            <View style={styles.innerContainer}>
                {loading ? <ActivityIndicator size="large" color={Colors.RED}/> : (
                    <FlatList
                        style={styles.flatList}
                        data={filter === "CodeChef" ? originalData.filter(contest => contest.status === "BEFORE" && contest.site === "CodeChef") :
                            filter === "CodeForces" ? originalData.filter(contest => contest.status === "BEFORE" && contest.site === "CodeForces") :
                                filter === "AtCoder" ? originalData.filter(contest => contest.status === "BEFORE" && contest.site === "AtCoder") :
                                    filter === "TopCoder" ? originalData.filter(contest => contest.status === "BEFORE" && contest.site === "TopCoder") :
                                        filter === "HackerRank" ? originalData.filter(contest => contest.status === "BEFORE" && contest.site === "HackerRank") :
                                            filter === "HackerEarth" ? originalData.filter(contest => contest.status === "BEFORE" && contest.site === "HackerEarth") :
                                                filter === "LeetCode" ? originalData.filter(contest => contest.status === "BEFORE" && contest.site === "LeetCode") :
                                                    filter === "Kick Start" ? originalData.filter(contest => contest.status === "BEFORE" && contest.site === "Kick Start") :
                                                        originalData.filter(contest => contest.status === "BEFORE")}
                        keyExtractor={({id}) => keyGenerator()}
                        ListEmptyComponent={noResultsDisplay()}
                        renderItem={({item}) => (
                            <ContestItem
                                item={item}
                            />
                        )}
                    />
                )}
            </View>
        </View>
    )
}

export default UpcomingContestsScreen

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    flatList: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10
    },
    pickerContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    picker: {
        height: 40,
        width: Platform.OS === 'web' ? WIDTH * 0.5 : WIDTH - 20,
        borderWidth: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
    },
    noResultContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    noResultImage: {
        height: 100,
        width: 100,
        marginTop: HEIGHT * 0.2
    },
    noResultText: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 16
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.RED
    }
})