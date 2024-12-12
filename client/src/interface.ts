export interface IUser {
  _id?: string;
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  profilePicture?: string;
}

export interface IPost {
  _id?: string;
  title: string;
  image: string;
  description: string;
  creatorId: IUser;
  likes: [string];
  comments: [string];
  createdAt: string;
}