import React, { Children, cloneElement, useContext, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function Flip(props) {
  const {isFlipped, setIsFlipped, children} = props
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const {chosenTheme} = useContext(ThemeContext);
  const [currentValue, setCurrentValue] = useState(0);

  const duration = 500;

  const estilo = estilos(chosenTheme);

  function flip() {
    if (currentValue == 0) {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
      easing: EasingNode.linear,
    }).start(() => {
      setCurrentValue(1);
      setIsFlipped(true);
      Animated.timing(rotateAnimation, {
        toValue: 2,
        duration: duration,
        useNativeDriver: true,
        easing: EasingNode.linear,
        }).start(() => {
          setCurrentValue(2);
        });
    });
  } else {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
      easing: EasingNode.linear,
    }).start(() => {
      setCurrentValue(1);
      setIsFlipped(false);
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: duration,
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
      <TouchableOpacity style={estilo.btn} onPress={flip}>
        <Text style={estilo.btnText}>Mais informações</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    btn: {
      backgroundColor: theme.backgroundContent,
      padding: 12,
    },
    btnText: {
      color: theme.text,
    }
  })
}
