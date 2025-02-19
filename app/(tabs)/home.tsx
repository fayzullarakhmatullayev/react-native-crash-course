import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Tranding from '@/components/Tranding';
import EmptyState from '@/components/EmptyState';
import { getLatestVideos, getVideos } from '@/lib/appwrite';
import { IVideo } from '@/types';
import { useAppwrite } from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: videos, loading, refetch } = useAppwrite<IVideo[]>(getVideos);
  const { data: latestVideos } = useAppwrite<IVideo[]>(getLatestVideos);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome back</Text>
                <Text className="text-2xl font-semibold text-white">JSMastery</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>
            <SearchInput handleChange={() => {}} value="" placeholder="Search for a video topic" />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest videos</Text>
              <Tranding posts={latestVideos!} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle="Be the first one to upload a video" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
