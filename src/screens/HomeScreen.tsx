import {ColorsBlock, TextBlock, WifiBlock} from '@/components';
import React, {useState} from 'react';
import {Appearance, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';

export const HomeScreen = () => {
  const [error, setError] = useState<any>(null);

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
        <WifiBlock setError={setError} />
        <TextBlock />
        <ColorsBlock />
      </ScrollView>
      <Snackbar
        action={{label: 'Окей'}}
        visible={error}
        onDismiss={() => setError(null)}>
        <Text style={{color: 'black'}}>{error}</Text>
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
