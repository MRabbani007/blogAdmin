import { StringToBoolean } from "class-variance-authority/types";

export type User = {
  id: string;
  _id?: string;

  username: string;
  email: string;

  firstName: string;
  lastName: string;
  profilePic?: string;

  createdAt?: TimeStamp;
  updatedAt?: TimeStamp;
};

export type MetaData = {
  id: string;
  _id?: string;

  title: string;
  detail?: string;
  pinned?: boolean;
  slug: string;
  category: string;
  tags: string[];
  status: string;
  icon?: string;
  sortIndex?: number;
  banner?: string;

  author?: string;
  authorID?: string;
  authorProfile?: string;

  views?: number;
  likes?: number;
  comments?: number;

  filename: string;
  pathname: string;
  downloadURL: string;

  createdAt?: TimeStamp | null;
  publishedAt?: TimeStamp | null;
  updatedAt?: TimeStamp | null;
};

export type Topic = {
  id: string;
  _id: string;

  name: string;
  posts: number;

  createdAt?: TimeStamp | null;
  updatedAt?: TimeStamp | null;
};

export type Tag = {
  id: string;
  _id: string;

  name: string;
  posts: number;

  createdAt?: TimeStamp | null;
  updatedAt?: TimeStamp | null;
};

type TimeStamp = { seconds: number; nanoseconds: number };
