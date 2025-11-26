export interface IconButtonType {
    icon?: React.ReactNode;
    title: string;
    url: string;
    onClick?: () => void;
}

export interface Author {
  _id: string;
  displayName: string;
  avatarURL: string;
};

export interface BlogType {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  author: Author;
  tags: string[];
  views: number;
  readTime: string;
  subscription?: string;
  createdAt: string;
}

export interface DocumentType {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  author: Author;
  tags: string[];
  views: number;
  readTime: string;
  subscription?: string;
  createdAt: string;
}

export interface ExamType {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  author: Author;
  tags: string[];
  completionCount: number;
  createdAt: string;
}

export interface User {
  _id: string;
  displayName: string;
  email: string;
  avatarURL?: string;
  bio?: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface RegisterPayload {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}