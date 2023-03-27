import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FirstScreen from "./src/screens/FirstScreen";
import SecondScreen from "./src/screens/SecondScreen";
import useTimer from "./src/hooks/useTimer";


const Tab = createBottomTabNavigator();


const App = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelPosition: "beside-icon",
                    tabBarLabelStyle: {
                        fontWeight: "700",
                        fontSize: 15
                    },
                    tabBarIconStyle: {display: "none"},
                }}
            >
                <Tab.Screen
                    name="First"
                    component={FirstScreen}
                />
                <Tab.Screen
                    name="Second"
                    component={SecondScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;
