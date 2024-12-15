import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import config from '@/config';

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId
} = config;

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export const signIn = async (payload: { email: string; password: string }) => {
  try {
    const session = await account.createEmailPasswordSession(payload.email, payload.password);
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const createUser = async (payload: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      payload.email,
      payload.password,
      payload.username
    );
    if (!newAccount) throw new Error('Failed to create user');

    const avatarUrl = avatars.getInitials(payload.username);
    await signIn({ email: payload.email, password: payload.password });
    const newUser = await database.createDocument(databaseId, userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      username: payload.username,
      email: payload.email,
      avatar: avatarUrl
    });
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error('Failed to get user');

    const currentUser = await database.listDocuments(databaseId, userCollectionId, [
      Query.equal('accountId', user.$id)
    ]);

    if (!currentUser) throw new Error('Failed to get current user');

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getVideos = async () => {
  try {
    const videos = await database.listDocuments(databaseId, videoCollectionId);
    return videos.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export { client, account };
