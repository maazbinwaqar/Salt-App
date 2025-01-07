import React from 'react';
import {memo} from 'react';
import {ScrollView, View} from 'react-native';

const HomeScreen = () => {
  return <ScrollView contentContainerStyle={{flex: 1}}></ScrollView>;
};

export default memo(HomeScreen);
