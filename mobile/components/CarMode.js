import React, { useContext } from 'react';
import { HStack, Center, VStack, Button, Card, Text } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../context';
const CarMode = () => {
  const { setMode, ws, rfid, wsConnected, mode } = useContext(AppContext);
  const handelPress = (mode) => {
    setMode(mode);
    ws.send(mode);
  };
  return (
    <>
      <VStack width="60%">
        <Center mt={20}>
          {!wsConnected ? 'connection failed' : `${mode} Mode Running now`}{' '}
          <HStack>
            <Button
              colorScheme="darkBlue"
              mx={4}
              rightIcon={
                <Ionicons color="white" size={20} name="speedometer" />
              }
              onPress={() => handelPress('pilot')}
            >
              <Text color="white">Pilot</Text>
            </Button>
            <Button
              mx={4}
              rightIcon={<Ionicons color="white" size={20} name="airplane" />}
              onPress={() => handelPress('auto-pilot')}
            >
              Auto-Pilot
            </Button>
          </HStack>
          <Card mt={15} width={250}>
            <HStack justifyContent="center" alignItems="center">
              {rfid.startsWith('No') ? (
                // change back ground color to red
                <MaterialCommunityIcons name="circle" size={15} color="red" />
              ) : (
                <MaterialCommunityIcons name="circle" size={15} color="green" />
              )}
              <Text
                fontWeight="bold"
                textAlign="center"
                ml={1}
              >{`${rfid}`}</Text>
            </HStack>
          </Card>
        </Center>
      </VStack>
    </>
  );
};

export default CarMode;
