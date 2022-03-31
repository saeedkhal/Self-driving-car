import {
  HStack,
  Center,
  NativeBaseProvider,
  VStack,
  IconButton,
  Button,
  Card,
  Text,
  Image,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const [RFID, setRFID] = useState(1);
  const [socketMessage, setSocketMessage] = useState('');

  var ws = new WebSocket('ws://192.168.1.9:80/slave');
  useEffect(() => {
    ws.onopen = () => {
      // connection opened
      console.log('Connected to server');
      ws.send('something'); // send a message
    };
    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };
  }, []);
  return (
    <NativeBaseProvider>
      <HStack safeArea width={Dimensions.get('window').width}>
        <Center
          width="30%"
          safeArea
          borderLeftWidth={2}
          borderColor="muted.300"
          pt="32"
          pb="32"
        >
          <IconButton
            onPress={() => ws.send('F')}
            icon={<Ionicons color="green" size={60} name="chevron-up-circle" />}
          />
          <HStack>
            <IconButton
              onPress={() => ws.send('R')}
              mx={4}
              icon={
                <Ionicons
                  color="green"
                  size={60}
                  name="chevron-forward-circle"
                />
              }
            />
            <IconButton
              onPress={() => ws.send('L')}
              mx={4}
              icon={
                <Ionicons color="green" size={60} name="chevron-back-circle" />
              }
            />
          </HStack>
          <IconButton
            onPress={() => ws.send('B')}
            icon={
              <Ionicons color="green" size={60} name="chevron-down-circle" />
            }
          />
        </Center>
        <VStack width="70%">
          <Center>
            <HStack marginY={5}>
              <Button
                colorScheme="darkBlue"
                mx={4}
                rightIcon={
                  <Ionicons color="white" size={20} name="speedometer" />
                }
              >
                <Text color="white">Pilot</Text>
              </Button>
              <Button
                mx={4}
                rightIcon={<Ionicons color="white" size={20} name="airplane" />}
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
              >{`RFID ID is: ${RFID}`}</Text>
            </Card>
          </Center>
        </VStack>
      </HStack>
    </NativeBaseProvider>
  );
}
