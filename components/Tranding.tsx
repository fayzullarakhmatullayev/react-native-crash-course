import { icons } from '@/constants';
import { useState } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Video, ResizeMode } from 'expo-av';
import { IVideo } from '@/types';

const zoomIn: any = {
  from: { scale: 0.85 },
  to: { scale: 1 }
};

const zoomOut: any = {
  from: { scale: 1 },
  to: { scale: 0.85 }
};

const TrandingItem = ({ activeItem, item }: { activeItem: any; item: IVideo }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          resizeMode={ResizeMode.CONTAIN}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          useNativeControls={true}
          shouldPlay={true}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPressOut={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5  overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Tranding = ({ posts }: { posts: IVideo[] }) => {
  const [activeItem, setActiveItem] = useState(posts?.[0]);
  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-white text-3xl">
          <TrandingItem activeItem={activeItem} item={item} />
        </Text>
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 70 }}
      horizontal
    />
  );
};

export default Tranding;
