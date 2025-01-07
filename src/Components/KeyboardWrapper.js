import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyBoardWrapper = ({children, scroll, styles}) => (
  <KeyboardAwareScrollView
    showsVerticalScrollIndicator={false}
    bounces={true}
    scrollEnabled={scroll ?? true}
    contentContainerStyle={{flexGrow: 1, ...styles}}>
    {children}
  </KeyboardAwareScrollView>
);

export default KeyBoardWrapper;
