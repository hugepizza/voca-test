export type Progress = {
  passed: number;
  used: number;
};

export type Candidate = {
  level: number;
  content: string;
  marked: boolean;
};

export type History = {
  time: number;
  score: number;
};
