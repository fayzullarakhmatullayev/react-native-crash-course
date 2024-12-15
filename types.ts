export interface IUser {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
}

export interface IVideo {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  creator: IVideoCreator;
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
}

export interface IVideoCreator {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
}
