import {useAppDispatch, useAppSelector} from '@/hooks';
import {selectApplicationSettings} from '@/store/selectors';
import {
  setBright,
  setColor,
  setSpeed,
} from '@/store/slices/applicationSettings';
import {Slider} from '@miblanchard/react-native-slider';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Card, MD3Colors, Text} from 'react-native-paper';

export const ColorsBlock = () => {
  const dispatch = useAppDispatch();
  const {speed, bright, color} = useAppSelector(selectApplicationSettings);

  const [speedValue, setSpeedValue] = useState(speed);
  const [brightValue, setBrightValue] = useState(bright);
  const [colorValue, setColorValue] = useState(color);

  const handleChangeSpeed = (value: any) => {
    setSpeedValue(+value);
    dispatch(setSpeed(+value));
  };

  const handleChangeBright = (value: any) => {
    setBrightValue(+value);
    dispatch(setBright(+value));
  };

  const handleChangeColor = (value: any) => {
    setColorValue(+value);
    dispatch(setColor(+value));
  };

  return (
    <Card>
      <Card.Content style={styles.slider}>
        <Text style={styles.text}>Скорость</Text>
        <Slider
          containerStyle={{flexGrow: 1}}
          thumbTintColor={MD3Colors.primary50}
          minimumTrackTintColor={MD3Colors.primary50}
          value={speedValue}
          onValueChange={(value: any) => handleChangeSpeed(value[0])}
        />
      </Card.Content>
      <Card.Content style={styles.slider}>
        <Text style={styles.text}>Яркость</Text>
        <Slider
          containerStyle={{flexGrow: 1}}
          thumbTintColor={MD3Colors.primary50}
          minimumTrackTintColor={MD3Colors.primary50}
          value={brightValue}
          onValueChange={(value: any) => handleChangeBright(value[0])}
        />
      </Card.Content>
      <Card.Content style={styles.slider}>
        <Text style={styles.text}>Цвет</Text>
        <Slider
          containerStyle={{flexGrow: 1}}
          thumbTintColor={MD3Colors.primary50}
          minimumTrackTintColor={MD3Colors.primary50}
          value={colorValue}
          onValueChange={(value: any) => handleChangeColor(value[0])}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  text: {
    marginRight: 20,
  },
  slider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
