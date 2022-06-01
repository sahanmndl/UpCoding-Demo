import "react-native-gesture-handler";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import LiveContestsScreen from "./src/views/LiveContestsScreen";
import UpcomingContestsScreen from "./src/views/UpcomingContestsScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const TopTabs = () => {
    return(
        <Tab.Navigator initialRouteName="LiveContestsScreen">
            <Tab.Screen
                name="LiveContestsScreen"
                component={LiveContestsScreen}
                options={{title: "Live"}}
            />
            <Tab.Screen
                name="UpcomingContestsScreen"
                component={UpcomingContestsScreen}
                options={{title: "Upcoming"}}
            />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="TopTabs"
                    component={TopTabs}
                    options={{headerShown: true, title: "UpCoding"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
