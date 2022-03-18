import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import StoreScreen from '../screens/StoreScreen/Store';
import ChatStackScreen from '../screens/ChatStackScreen/ChatStackScreen'
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ProfileStackScreen from '../screens/ProfileStackScreen/ProfileStackScreen';
import EditProfile from '../screens/EditProfile/EditProfile';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="FREE SNS"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Home"
      component={ProfileStackScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="MESSAGE">
      {props => <MessagesScreen {...props} /> }
    </Stack.Screen>
    <Stack.Screen
      name="CHAT"
      
      options={({route}) => ({
        title: route.params.name,
        headerBackTitleVisible: false,
      })}
    >
      {props => <ChatScreen {...props}  /> }
    </Stack.Screen>
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileStackScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />


  </Stack.Navigator>
  
  
);



const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'SNS') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
            <Tab.Screen
        name="Home"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({size}) => (
          <Feather name="search" size={size} color={'#3d3d29'} />
        ),
      }}
    />
<Tab.Screen
        name="SNSTAP"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'SNS',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />

    
 
      <Tab.Screen
        name="CHATATP"
        component={MessageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'CHAT',
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
          <Tab.Screen
      name="STORE"
      component={StoreScreen}
      options={{
        tabBarIcon: ({size}) => (
          <AntDesign name="hearto" size={size} color={'#3d3d29'} />
        ),
      }}
    />
         <Tab.Screen
      name="SETTING"
      component={SettingScreen}
      options={{
        tabBarIcon: ({size}) => (
          <MaterialCommunityIcons
            name="server"
            size={size}
            color={'#3d3d29'}
          />
        ),
      }}
    />
  
    </Tab.Navigator>
  );
};

export default AppStack;
