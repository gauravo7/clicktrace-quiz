export interface Quiz {
  autoId?: string;       // Firebase auto ID will be string
  isEnd: boolean;
  isStart: boolean;
  startAt: number;       // timestamp using Date.now()
  endAt: number;
  createdAt: number;
  leaderBoard: LeaderBoardEntry[];
}

export interface LeaderBoardEntry {
  name: string;
  course: string;
  branch: string;
  rollNo: string;
}
