import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Index from './Main/Index';
import Detail from './Main/Detail';
import Show from './Main/Show';
import CreateHome from './Main/Create';
import Search from './Main/Search';
import Update from './Main/Update';
import SearchResult from './Main/SearchResult';
import ShowModal from './Components/Modal';

const CT = createStackNavigator();

function CtNavigator() {
  return (
    <CT.Navigator>
      <CT.Screen
      name="Index" 
      component={Index} 
      />
      <CT.Screen 
      options={{
      title: "Create house information",
      }}
      name="Create" 
      component={CreateHome} 
      />
       <CT.Screen  
      options={{
      title: "Detail",
      }}
      name="Detail" 
      component={Detail} 
      />
       <CT.Screen
      name="Update" 
      component={Update}
      />
      <CT.Screen
      name="Show" 
      component={Show}
      />
      <CT.Screen
      name="Search" 
      component={Search}
      />
      <CT.Screen
      name="SearchResult" 
      component={SearchResult}
      />
       <CT.Screen
      name="ShowModal" 
      component={ShowModal}
      />
    </CT.Navigator>
  
  );
  
}

export default function App() {
  return (
    <NavigationContainer>
      <CtNavigator/>
    </NavigationContainer>
  );
}
