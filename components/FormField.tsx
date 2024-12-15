import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { icons } from '@/constants';

const FormField = ({
  title,
  value,
  handleChange,
  otherStyles,
  placeholder,
  ...props
}: {
  title: string;
  value: string;
  handleChange: (e: string) => void;
  otherStyles?: string;
  placeholder?: string;
  [key: string]: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          {...props}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword((value) => !value)} activeOpacity={0.8}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
