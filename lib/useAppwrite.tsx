import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Models } from 'react-native-appwrite';

export const useAppwrite = <T,>(requestFunction: () => Promise<Models.Document[]>) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await requestFunction();
      setData(data as T);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => fetchData();

  return { data, loading, refetch };
};
