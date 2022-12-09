import {ColorsBlock, TextBlock, WifiBlock} from '@/components';
import React, {useRef, useState} from 'react';
import {Appearance, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {MD3Colors, Snackbar, Text} from 'react-native-paper';
import useWebSocket, {ReadyState} from 'react-native-use-websocket';

export const HomeScreen = () => {
  const [status, setStatus] = useState('Неизвестно');

  const [value, setValue] = useState('');
  const handleChange = (text: string) => {
    setValue(text);
  };

  const [error, setError] = useState<any>(null);
  const [ip, setIp] = useState('192.168.4.1');
  const [port, setPort] = useState('80');
  const didUnmount = useRef(false);

  const handleChangeIp = (text: string) => {
    setIp(text);
  };

  const handleChangePort = (text: string) => {
    setPort(text);
  };

  const {sendMessage, lastMessage, readyState} = useWebSocket(
    `ws://${ip}:${port}`,
    {
      shouldReconnect: () => {
        return didUnmount.current === false;
      },
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    },
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={
            Appearance.getColorScheme() === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
          translucent
        />
        <WifiBlock
          connectionStatus={connectionStatus}
          setError={setError}
          status={status}
          setStatus={setStatus}
          ip={ip}
          port={port}
          handleChangeIp={handleChangeIp}
          handleChangePort={handleChangePort}
        />
        <TextBlock
          value={value}
          handleChange={handleChange}
          setValue={setValue}
        />
        <ColorsBlock />
      </ScrollView>
      <Snackbar
        action={{label: 'Окей'}}
        visible={error}
        style={{backgroundColor: MD3Colors.primary95}}
        onDismiss={() => setError(null)}>
        <Text style={{color: MD3Colors.primary10}}>{error}</Text>
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
