import React, { useEffect, useRef } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';

const images = [
  require('../assets/workout/slide1.png'),
  require('../assets/workout/slide2.jpg'),
  require('../assets/workout/slide3.jpg'),
  require('../assets/workout/slide4.jpg'),
  require('../assets/workout/slide5.jpg'),
];

const SliderImages = () => {
  const scrollViewRef = useRef(null);
  const scrollOffset = useRef(0);
  const { width: screenWidth } = useWindowDimensions();
  const IMAGE_WIDTH = screenWidth * 0.9;
  const IMAGE_HEIGHT = 250;

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollOffset.current += screenWidth;

        if (scrollOffset.current >= screenWidth * images.length) {
          scrollOffset.current = 0;
        }

        scrollViewRef.current.scrollTo({ x: scrollOffset.current, animated: true });
      }
    }, 4000); // Slow down the scrolling

    return () => clearInterval(interval);
  }, [screenWidth]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {images.map((image, index) => (
        <View
          key={index}
          style={{
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10, // Adjust margin to add space below the images
          }}
        >
          <Image
            source={image}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              borderRadius: 20,
            }}
            resizeMode="cover"
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default SliderImages;
