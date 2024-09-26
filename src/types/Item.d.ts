export type Item = {
  id: number;
  question: string;
  answer: string;
  user: {
    id: number;
    email: string;
    provider: string;
  };
  user_email: string;
};
