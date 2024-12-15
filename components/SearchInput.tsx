import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { icons } from '@/constants';

const SearchInput = ({
  value,
  handleChange,
  otherStyles,
  placeholder,
  ...props
}: {
  value: string;
  handleChange: (e: string) => void;
  otherStyles?: string;
  placeholder?: string;
  [key: string]: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        {...props}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
