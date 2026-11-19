export type NavSection =
  | 'dashboard'
  | 'ai-assistant'
  | 'code-studio'
  | 'code-doctor'
  | 'firmware-lab'
  | 'coding-arena'
  | 'projects'
  | 'snippets'
  | 'settings';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  codingStreak: number;
  totalProjects: number;
  completedChallenges: number;
}

export interface ProjectFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  template: 'html' | 'javascript' | 'python' | 'arduino' | 'esp32';
  updatedAt: string;
  files: ProjectFile[];
  starred?: boolean;
}

export interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
  description: string;
  initialCode: string;
  testCases: { input: string; expected: string; description: string }[];
  completed?: boolean;
}

export interface BuildArtifact {
  id: string;
  filename: string;
  extension: string;
  targetBoard: 'Arduino Uno' | 'ESP32 DevKit' | 'ESP32-S3' | 'Python Worker';
  config: string;
  fileSize: string;
  sha256: string;
  status: 'SUCCESS' | 'FAILED' | 'BUILDING';
  buildLogs: string[];
  createdAt: string;
}
