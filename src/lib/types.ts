export type EventRecord = {
  id: string;
  title: string;
  description: string;
  starts_at: string;
  venue: string;
  image_path: string | null;
  is_published: boolean;
  created_at: string;
};
