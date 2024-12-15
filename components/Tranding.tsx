import { FlatList, Text, View } from 'react-native';
import React from 'react';

const Tranding = ({ posts }: { posts: any }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <Text className="text-white text-3xl">{item.$id}</Text>}
      horizontal
    />
  );
};

export default Tranding;
