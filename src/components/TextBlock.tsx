import {useAppDispatch, useAppSelector} from '@/hooks';
import {selectApplicationSettings} from '@/store/selectors';
import {setAuto, setCaps} from '@/store/slices/applicationSettings';
import Voice from '@react-native-voice/voice';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';

export const TextBlock = ({value, handleChange, setValue}: any) => {
  const dispatch = useAppDispatch();
  const {auto, caps} = useAppSelector(selectApplicationSettings);

  const [icon, setIcon] = useState('microphone');
  const [autoValue, setAutoValue] = useState(auto);
  const [capsValue, setCapsValue] = useState(caps);

  const handleChangeAuto = () => {
    setAutoValue(!auto);
    dispatch(setAuto(!auto));
  };
  const handleChangeCaps = () => {
    setCapsValue(!caps);
    dispatch(setCaps(!caps));
  };

  const onStartButtonPress = () => {
    Voice.start('ru-RU');
  };

  useEffect(() => {
    Voice.onSpeechError = onSpeechErrorHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechStart = onSpeechStartHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSpeechStartHandler = () => {
    setIcon('ear-hearing');
  };

  const onSpeechResultsHandler = (e: any) => {
    setValue(e.value[0]);
    setIcon('microphone');
  };

  const onSpeechErrorHandler = (e: any) => {
    console.log(e);
    setIcon('microphone');
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.icons}>
          <IconButton
            mode="contained"
            disabled={icon === 'ear-hearing'}
            size={100}
            icon={icon}
            onPress={onStartButtonPress}
            style={styles.micro}
          />
          <IconButton
            mode="contained"
            size={100}
            icon={'power'}
            onPress={() => {
              RNExitApp.exitApp();
            }}
            style={styles.micro}
          />
        </View>
        <TextInput
          value={value}
          placeholder={'Текст бегущей строки'}
          onChangeText={handleChange}
        />
      </Card.Content>
      <Card.Actions>
        <Text>Авто</Text>
        <Checkbox
          status={autoValue ? 'checked' : 'unchecked'}
          onPress={handleChangeAuto}
        />
        <Text>КАПС</Text>
        <Checkbox
          status={capsValue ? 'checked' : 'unchecked'}
          onPress={handleChangeCaps}
        />
        <Button>Отправить</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  icons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micro: {
    marginVertical: 20,
    // alignSelf: 'center',
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
