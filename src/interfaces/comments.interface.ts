export interface Comment {
  id: string;
  post_id: string;
  user_id: number;
  parent_id: string;
  content: string;
}
