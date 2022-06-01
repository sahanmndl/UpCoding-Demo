import {StyleSheet, Text, View, ActivityIndicator, FlatList} from 'react-native';
import {useEffect, useState} from "react";
import ContestItem from "./src/components/ContestItem";
import Colors from "./src/constants/Colors";
import {StatusBar} from "expo-status-bar";

export default function App() {

    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [codingStatusData, setCodingStatusData] = useState([])
    const [page, setPage] = useState(1)
    const [paginationLoader, setPaginationLoader] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
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
            <StatusBar
                style="dark"
            />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    appBar: {
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    searchBar: {
        marginBottom: 8
    },
    header: {
        backgroundColor: Colors.DARK
    },
    flatList: {
        flex: 1,
    },
    footer: {
        alignItems: "center"
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
});
