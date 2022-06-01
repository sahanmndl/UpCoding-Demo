import React, {useEffect, useState} from "react";
import {View, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import Colors from "../constants/Colors";
import ContestItem from "../components/ContestItem";

const LiveContestsScreen = () => {

    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [error, setError] = useState(null)

    const fetchAllContests = async () => {
        try {
            const response = await fetch(`https://kontests.net/api/v1/all`)
            const json = await response.json()
            setOriginalData([...originalData, ...json])
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

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {loading ? <ActivityIndicator size="large" color={Colors.RED}/> : (
                    <FlatList
                        style={styles.flatList}
                        data={originalData.filter(contest => contest.status === "CODING")}
                        keyExtractor={({id}) => keyGenerator()}
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

export default LiveContestsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    flatList: {
        flex: 1,
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