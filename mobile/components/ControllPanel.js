import React, { useContext } from 'react';
import { HStack, Center, IconButton, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context';

const ControllPanel = () => {
  const { mode, setMode, ws, wsConnected } = useContext(AppContext);
  return (
    <>
      <Center width="40%" borderLeftWidth={2} borderColor="muted.300">
        <Text> </Text>
        <IconButton
          isDisabled={mode === 'auto-pilot' || !wsConnected}
          onPressIn={() => {
            ws.send('F');
            console.log('forwared order sent');
          }}
          onPressOut={() => {
            ws.send('S');
            console.log('stop oredr sent');
          }}
          icon={<Ionicons color="green" size={60} name="chevron-up-circle" />}
        />
        <HStack>
          <IconButton
            isDisabled={mode === 'auto-pilot' || !wsConnected}
            onPressIn={() => ws.send('L')}
            onPressOut={() => ws.send('S')}
            mx={4}
            icon={
              <Ionicons color="green" size={60} name="chevron-back-circle" />
            }
          />
          <IconButton
            isDisabled={mode === 'auto-pilot' || !wsConnected}
            onPressIn={() => ws.send('R')}
            onPressOut={() => ws.send('S')}
            mx={4}
            icon={
              <Ionicons color="green" size={60} name="chevron-forward-circle" />
            }
          />
        </HStack>
        <IconButton
          isDisabled={mode === 'auto-pilot' || !wsConnected}
          onPressIn={() => {
            ws.send('B');
            console.log('back order sent');
          }}
          onPressOut={() => ws.send('S')}
          icon={<Ionicons color="green" size={60} name="chevron-down-circle" />}
        />
      </Center>
    </>
  );
};
export default ControllPanel;
