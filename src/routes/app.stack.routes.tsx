import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { Schedule } from '../screens/Schedule';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName={'Home'}>
      <Screen name={'Home'} component={Home} />
      <Screen name={'CarDetails'} component={CarDetails} />
      <Screen name={'Schedule'} component={Schedule} />
      <Screen name={'SchedulingDetails'} component={SchedulingDetails} />
      <Screen name={'Confirmation'} component={Confirmation} />
      <Screen name={'MyCars'} component={MyCars} />
    </Navigator>
  );
}
