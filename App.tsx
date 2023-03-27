import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FirstScreen from './src/screens/FirstScreen'
import SecondScreen from './src/screens/SecondScreen'
import { Provider } from 'react-redux'
import { store } from './src/store'

const Tab = createBottomTabNavigator()

const App = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelPosition: 'beside-icon',
                    tabBarLabelStyle: {
                        fontWeight: '700',
                        fontSize: 15,
                    },
                    tabBarIconStyle: { display: 'none' },
                }}
            >
                <Tab.Screen name="First" component={FirstScreen} />
                <Tab.Screen name="Second" component={SecondScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    </Provider>
)

export default App
