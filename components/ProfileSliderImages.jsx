import React, { useEffect, useRef } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';

const images = [
  { uri: 'https://drive.google.com/uc?export=view&id=1WqnQgLvN3TMU38cOwpjYtWzfV0pTb9mf' },
  { uri: 'https://drive.google.com/uc?export=view&id=1EFIeSJSh9dX5iDQuH3CAdnQ-eVP7rI3b' },
  { uri: 'https://drive.google.com/uc?export=view&id=1bubYVLMQR_DC5evCaADuT-i8OIDlOu-9' },
  { uri: 'https://drive.google.com/uc?export=view&id=1iQtcdsCbJ7C5jmGFAepnhFx0KbqCH_NQ' },
  { uri: 'https://drive.google.com/uc?export=view&id=1I9igzbxd151xtlnZkwE351UHIXISpUCs' },
  { uri: 'https://drive.google.com/uc?export=view&id=1MsZ4C0BzriA_zW2YAamJL3gZCgbGFaLg' },
  { uri: 'https://drive.google.com/uc?export=view&id=1clfi4H38lGUBODgy30M5BipDkT9xmzkX' },
];

const ProfileSliderImages = () => {
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
    }, 4000);

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
            marginBottom: 20,
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

export default ProfileSliderImages;
