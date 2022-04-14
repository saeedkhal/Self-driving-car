import React, { useState, useEffect } from 'react';
import { HStack, NativeBaseProvider } from 'native-base';
import { Dimensions } from 'react-native';
import ControllPanel from './components/ControllPanel';
import CarMode from './components/CarMode';
import { AppContext, AppProvider } from './context';
export default function App() {
  return (
    <AppProvider>
      <NativeBaseProvider>
        <HStack safeArea width={Dimensions.get('window').width}>
          <CarMode />
          <ControllPanel />
        </HStack>
      </NativeBaseProvider>
    </AppProvider>
  );
}
