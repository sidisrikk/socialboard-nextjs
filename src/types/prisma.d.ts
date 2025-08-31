// Minimal Prisma type definitions to maintain compatibility
// These types match the schema.prisma file structure

declare module '@prisma/client' {
  export interface User {
    id: number;
    username: string;
  }

  export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
  }

  export interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    postId: number;
    authorId: number;
  }

  export declare class PrismaClient {
    user: any;
    post: any;
    comment: any;
  }
}