
export interface User {
  id: string;
  name: string;
  avatar: string;
  credits: number;
  plantedCount: number;
  bio: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  priceInCredits: number;
  image: string;
  seller: string;
  category: 'Plant' | 'Seed' | 'Tool' | 'Fertilizer';
  description: string;
}

export interface PlantLog {
  id: string;
  plantType: string;
  location: string;
  timestamp: string;
  creditsEarned: number;
  status: 'Verified' | 'Pending';
}

export type AppView = 'feed' | 'shop' | 'plant' | 'doctor' | 'profile' | 'community';
