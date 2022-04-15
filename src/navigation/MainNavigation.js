import React, {useState, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';//import icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import all the screens
import SplashScreen from '../screens/SplashScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateScreen from '../screens/CreateScreen';
import QuizDetails from '../screens/QuizDetails';
import AssignmentDetails from '../screens/AssignmentDetails';
//import context

import { Context as appContext } from '../context/appContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



const HomeStackScreen = ({navigation})=>{
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen
            name='home'
            component={HomeScreen}
            options={{
              title:'Champion Challenger',
              headerStyle:{
                backgroundColor:'midnightblue'
              },
              headerTintColor:'#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                
              },
            }}
            />
            <HomeStack.Screen 
            name='quiz_details'
            component={QuizDetails}
            options={({ route })=>({
              title: route.params.title,
              headerStyle:{
                backgroundColor:'midnightblue',
              },
              headerTintColor: '#fff',
            })
          }
            />
            <HomeStack.Screen 
            name='assignment_details'
            component={AssignmentDetails}
            />
        </HomeStack.Navigator>
    )
}

const ProfileStackScreen = ({navigation})=>{
  return(
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
      name='profile'
      component={ProfileScreen}
      options={{
        headerShown: false
      }}
      />
    </ProfileStack.Navigator>
  )
}

const AuthStackScreen = ({navigation})=>{
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen 
            name='login'
            component={LoginScreen}
            options={{
              headerShown: false
            }}
            />
            <AuthStack.Screen 
            name='signup'
            component={SignupScreen}
            options={{
              headerShown: false
            }}
            />

            
        </AuthStack.Navigator>
    )
}


export default function MainNavigation() {

  const [isLoading,setIsLoading] = useState(true);
  const [isAuthenticated,setisAuthenticated] = useState(false);
  
  const { state } = useContext(appContext);
  const auth_token = state.token;

  const checkAuthentication = async()=>{
    const token = await AsyncStorage.getItem('@auth_token');
    if(token !== null) {
      setisAuthenticated(true);
    }
  }
  useEffect(()=>{
    checkAuthentication();
  },[auth_token]);

  useEffect(()=>{
    setTimeout(()=>{
        setIsLoading(false);
    },2000);
  },[]);

  if(isLoading) return <SplashScreen />

  return (
    <NavigationContainer theme={theme}>
        {isAuthenticated?(<>
        {/* <HomeStackScreen /> */}
        <Tab.Navigator
            initialRouteName="home"
            activeColor="#fff"
            barStyle={{ backgroundColor: 'midnightblue' }}
        >
          <Tab.Screen 
          name='hometab'
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons size={20} color={color} name={'home'} />
            ),
          }}
          />
        <Tab.Screen 
        name='create'
        component={CreateScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={20} color={color} name={'plus-circle'} />
          ),
        }}
        
        />
        <Tab.Screen 
        
        name='profiletab'
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={20} color={color} name={'account-circle'} />
          ),
        }}
        
        />
        </Tab.Navigator>
        </>):(<>
          <AuthStackScreen />
        </>)}
    </NavigationContainer>
  )
}