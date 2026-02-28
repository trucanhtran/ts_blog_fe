export interface FeedPost {
  id: string;
  username: string;
  avatar?: string;
  content: string;
  timeAgo: string;
  likeCount: number;
  replyCount: number;
}
