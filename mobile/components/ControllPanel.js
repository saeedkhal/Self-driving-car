import React, { useContext } from 'react';
import { HStack, Center, IconButton, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context';

const ControllPanel = () => {
  const { mode, setMode, ws, wsConnected } = useContext(AppContext);
  return (
    <>
      <Center width="40%" borderLeftWidth={2} borderColor="muted.300">
        <Text>
          {' '}
          {!wsConnected ? 'connection failed' : `${mode} Mode Running now`}{' '}
        </Text>
        <IconButton
          isDisabled={mode === 'auto-pilot' || !wsConnected}
          onPressIn={() => ws.send('F')}
          onPressOut={() => ws.send('S')}
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
          onPressIn={() => ws.send('B')}
          onPressOut={() => ws.send('S')}
          icon={<Ionicons color="green" size={60} name="chevron-down-circle" />}
        />
      </Center>
    </>
  );
};
export default ControllPanel;
