import { Image, ImageProps, View } from 'react-native';
import { Tabs } from 'expo-router';

import { icons } from '@/constants';

const TabIcon = ({ icon, color }: { icon: ImageProps; color: string }) => {
  return (
    <View className="flex-1 items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="!w-6 !h-6" />
    </View>
  );
};

export const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffa001',
          tabBarInactiveTintColor: '#cdcde0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabIcon icon={icons.home} color={color} />
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabIcon icon={icons.bookmark} color={color} />
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabIcon icon={icons.plus} color={color} />
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabIcon icon={icons.profile} color={color} />
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
