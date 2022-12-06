import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  TextInput,
} from 'react-native-paper';
import WifiManager from 'react-native-wifi-reborn';

type Props = {
  visible: boolean;
  setWifi: (...args: any) => any;
  hideModal: (...args: any) => any;
};

export const WifisModal = ({visible, setWifi, hideModal}: Props) => {
  const [wifis, setWifis] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [showConnect, setShowConnect] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState<any>(null);

  const handleShowConnect = (wifi: any) => {
    setShowConnect(true);
    setSelectedWifi(wifi);
  };

  const handleHideConnect = () => {
    setShowConnect(false);
    setSelectedWifi(null);
  };

  const handleChange = (text: string) => setValue(text);

  useEffect(() => {
    if (visible) {
      setValue('');
      setSelectedWifi(null);
      setShowConnect(false);
      setLoading(true);
      setWifis([]);
      WifiManager.reScanAndLoadWifiList().then(data => {
        setWifis(data);
        setLoading(false);
      });
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      onDismiss={hideModal}
      transparent
      style={{zIndex: 1000}}
      visible={visible}>
      <View style={styles.bg}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Card style={styles.content}>
            {showConnect && (
              <View style={styles.connectCard}>
                <Card style={styles.connectCardInner}>
                  <Card.Title title="Подключение" />
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={handleChange}
                    label={'Пароль(Если требуется)'}
                  />
                  <Card.Actions>
                    <Button onPress={handleHideConnect}>Закрыть</Button>
                    <Button onPress={() => setWifi(selectedWifi, value)}>
                      Подключть
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            )}
            <Card.Title title="Доступные подключения" />
            <ScrollView showsVerticalScrollIndicator={false}>
              {wifis
                .filter((item: any) => item.SSID !== '(hidden SSID)')
                .map((item: any, i: number) => (
                  <Button
                    onPress={() => handleShowConnect(item)}
                    key={i}
                    style={styles.button}
                    mode="contained-tonal">
                    <Text>{item.SSID}</Text>
                  </Button>
                ))}
            </ScrollView>
            <Card.Actions>
              <Button onPress={hideModal}>Закрыть</Button>
            </Card.Actions>
          </Card>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 100,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    marginBottom: 20,
  },
  connectCard: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    zIndex: 100,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectCardInner: {
    width: '100%',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});
