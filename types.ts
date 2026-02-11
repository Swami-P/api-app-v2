import { LucideIcon } from 'lucide-react';

export interface ApiDefinition {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'Data' | 'Utility' | 'Entertainment';
}

export interface ApiProps {
  definition: ApiDefinition;
}

export type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
