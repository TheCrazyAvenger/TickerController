import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import WifiManager from 'react-native-wifi-reborn';
import {WifisModal} from './WifisModal';

export const WifiBlock = ({
  connectionStatus,
  setError,
  status,
  setStatus,
  port,
  ip,
  handleChangePort,
  handleChangeIp,
}: any) => {
  const [visible, setVisible] = useState(false);

  const handleSetVisible = () => {
    setVisible(true);
  };
  const handleSetHide = () => {
    setVisible(false);
  };

  const handleDisconect = async () => {
    WifiManager.disconnect();
    setStatus('Неизвестно');
  };

  const setWifi = (wifi: any, password: string) => {
    setError(null);
    WifiManager.connectToProtectedSSID(wifi.SSID, password, false)
      .then(() => {
        setVisible(false);
        setStatus('Подключено к ' + wifi.SSID);
      })
      .catch(e => {
        console.log(e);
        setError(e.message);
        setVisible(false);
      });
  };

  return (
    <>
      <WifisModal
        visible={visible}
        setWifi={setWifi}
        hideModal={handleSetHide}
      />
      <Card style={styles.container}>
        <Card.Title title={`Статус: ${status}`} />
        <Card.Actions>
          {status !== 'Неизвестно' ? (
            <Button onPress={handleDisconect}>Отключить</Button>
          ) : (
            <Button onPress={handleSetVisible}>Выбрать</Button>
          )}
        </Card.Actions>
      </Card>
      {status !== 'Неизвестно' ? (
        <Card style={styles.container}>
          <Card.Title title={`Статус: ${connectionStatus}`} />
          <Card.Content>
            <TextInput
              value={ip}
              label={'IP'}
              placeholder={'IP'}
              style={{marginBottom: 10}}
              onChangeText={handleChangeIp}
            />
            <TextInput
              value={port}
              label={'Порт'}
              placeholder={'Порт'}
              onChangeText={handleChangePort}
            />
          </Card.Content>
        </Card>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
