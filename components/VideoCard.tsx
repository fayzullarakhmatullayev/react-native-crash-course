import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { IVideo } from '@/types';
import { icons } from '@/constants';

const VideoCard = ({ video }: { video: IVideo }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {video.title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {video.creator.username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Text className="text-white font-psemibold text-sm">Playing</Text>
      ) : (
        <TouchableOpacity
          className="w-full aspect-video rounded-lg relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-lg mt-3"
            resizeMode="cover"
            style={{ marginTop: 20 }}
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
