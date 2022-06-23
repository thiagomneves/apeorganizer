import React, { Children, cloneElement, useContext, useState } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function Flip(props) {
  const {isFlipped, setIsFlipped, children} = props
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const {chosenTheme} = useContext(ThemeContext);
  const [currentValue, setCurrentValue] = useState(0);

  function flip() {
    if (currentValue == 0) {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: EasingNode.linear,
    }).start(() => {
      setCurrentValue(1);
      setIsFlipped(true);
      Animated.timing(rotateAnimation, {
        toValue: 2,
        duration: 800,
        useNativeDriver: true,
        easing: EasingNode.linear,
        nativeEvent: (e) => Animated.call([e.rotation], console.log())
      }).start(() => {
        setCurrentValue(2);
      });
    });
  } else {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: EasingNode.linear,
    }).start(() => {
      setCurrentValue(1);
      setIsFlipped(false);
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: EasingNode.linear,
      }).start(() => {
        setCurrentValue(0);
      });
    });
  }
}

  const setInterpolate=rotateAnimation.interpolate({
    inputRange: [0,2],
    outputRange: ["0deg", "180deg"]
  })

  const animatedStyleValue={
    transform: [
      {rotateY: setInterpolate}
    ]
  }

  const extendedChildren = Children.map(children, (child) => {
    return cloneElement(child, {isFlipped, setIsFlipped, ...props});
  });
  return (
    <View>
      <Animated.View style={animatedStyleValue}>
        <View>{extendedChildren}</View>
      </Animated.View>
      <TouchableOpacity onPress={flip}
        style={{
          backgroundColor: chosenTheme.backgroundContent,
          padding: 10,
          borderBottomWidth: 1,
          borderColor: chosenTheme.border,
        }}>
        <Text>Mais informações</Text>
      </TouchableOpacity>
    </View>
  );
}
