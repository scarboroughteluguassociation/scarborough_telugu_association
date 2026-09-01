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

export type MemberRecord = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  created_at: string;
};
