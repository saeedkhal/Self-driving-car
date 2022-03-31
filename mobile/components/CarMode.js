import React, { useContext } from 'react';
import { HStack, Center, VStack, Button, Card, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context';

const CarMode = () => {
  const { setMode, ws, rfid } = useContext(AppContext);
  const handelPress = (mode) => {
    setMode(mode);
    ws.send(mode);
  };
  return (
    <>
      <VStack width="60%">
        <Center>
          <HStack marginY={5}>
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
          <Button
            marginY={5}
            colorScheme="yellow"
            rightIcon={<Ionicons color="black" size={20} name="bluetooth" />}
          >
            <Text>Find RFID</Text>
          </Button>
          <Card mt={20} width={250}>
            <Text
              fontWeight="bold"
              textAlign="center"
            >{`RFID ID is: ${rfid}`}</Text>
          </Card>
        </Center>
      </VStack>
    </>
  );
};
export default CarMode;
