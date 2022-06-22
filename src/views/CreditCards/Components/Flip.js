import React, { Children, cloneElement, isValidElement, useState } from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';

export default function Flip(props) {
  const {isFlipped, setIsFlipped, children} = props
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [currentValue, setCurrentValue] = useState(0);

  useState(() => {

  }, [isFlipped])
  function flip() {
    if (currentValue == 0) {
    Animated.timing(rotateAnimation, {
      toValue: 2,
      duration: 800,
      useNativeDriver: true,
      easing: EasingNode.linear,
    }).start(() => {
      setCurrentValue(2);
      setIsFlipped(true);
    });
  } else {
    Animated.timing(rotateAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: EasingNode.linear,
    }).start(() => {
      setCurrentValue(0);
      setIsFlipped(false);
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
    return cloneElement(child, {isFlipped, setIsFlipped});
  });
  return (
    <View>
      <Animated.View style={animatedStyleValue}>
        <View>{extendedChildren}</View>
      </Animated.View>
      <TouchableOpacity onPress={flip}>
        <Text>Mais informações</Text>
      </TouchableOpacity>
    </View>
  );
}
