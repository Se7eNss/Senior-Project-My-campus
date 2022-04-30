
// ----------------------------------------------------------------------

import { Eve } from "./event";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'jwt';
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
};

export type ProfileState = {
  isLoading: boolean;
  error: Error | string | null;
  profile: User | null;
  other: User | null;
  comments: Comment[];
}

type User = {
  avatar: {
      public_id: string,
      url: string
  },
  name: string,
  faculty: string,
  twitter: string,
  facebook: string,
  instagram: string,
  email: string,
  comments: Comment[],
  events: Eve[],
  id: string,
}
export type Comment = {
  image: {
      public_id: string,
      url: string
  },
  _id: string,
  userId: User,
  comment: string,
  rate: number,
  status: string,
  event: string,
  createdAt: string | Date,
  __v: number
}
