export type Role = "system" | "user" | "assistant";

export type Metadata = {
  id: string;
  score: number;
  label: string;
  source: string;
  page: number;
  content: string;
};

export interface Message {
  role: Role;
  content: string;
  metadata?: Metadata[];
}

export interface Conversation {
  id: string;
  name: string;
  date: string;
  preview: string;
  messages: Message[];
}