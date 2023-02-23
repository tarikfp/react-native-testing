import React from 'react';
import {Button, Text, View} from 'react-native';
import {COMMON_STYLES} from './theme/common-styles';

const Counter = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <View style={COMMON_STYLES.flexCenter}>
      <Button
        testID="increase-btn"
        onPress={() => setCounter(prev => prev + 1)}
        title="Increase"
      />
      <Button
        testID="decrease-btn"
        onPress={() => setCounter(prev => prev - 1)}
        title="Decrease"
      />
      <Text testID="count-text">Count: {counter}</Text>
    </View>
  );
};

export default function App() {
  return <Counter />;
}
