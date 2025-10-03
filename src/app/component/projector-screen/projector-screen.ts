import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NoQuestionsLoader } from "../no-questions-loader/no-questions-loader";
import { QuestionsService } from '../../services/questions/questions.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { LeaderBoardEntry } from '../../models/quiz.model';

@Component({
  selector: 'app-projector-screen',
  imports: [CommonModule, NoQuestionsLoader],
  templateUrl: './projector-screen.html',
  styleUrl: './projector-screen.css'
})
export class ProjectorScreen {
  hasQuestion = 0;
  topThree = [
    { id: 2, name: 'John Doe', course: 'B.Tech', branch: 'CSE', rollNo: 252312, rank: 2, avatar: 1 },
    { id: 1, name: 'Rey Mibourne', course: 'B.Tech', branch: 'CSE', rollNo: 252312, rank: 1, avatar: 2 },
    { id: 3, name: 'Augusta Mitchell', course: 'B.Tech', branch: 'CSE', rollNo: 252312, rank: 3, avatar: 3 }
  ];

  leaderboardList: any[] = [
    { rank: 1, name: 'Rey Mibourne', course: 'B.Tech', branch: 'CSE', rollNo: 252312, avatar: 1 },
    { rank: 2, name: 'John Doe', course: 'B.Tech', branch: 'CSE', rollNo: 222322, avatar: 2 },
    { rank: 3, name: 'Augusta Mitchell', course: 'B.Tech', branch: 'CSE', rollNo: 623323, avatar: 3 },
    { rank: 4, name: 'Rey Mibourne', course: 'B.Tech', branch: 'CSE', rollNo: 224332, avatar: 1 },
    { rank: 5, name: 'Rey Mibourne', course: 'B.Tech', branch: 'CSE', rollNo: 343455, avatar: 2 }
  ];

  achievements: any[] = [
    { level: 1 },
    { level: 2 },
    { level: 3 },
    { level: 4 }
  ];
  categories = ['Best Talk', 'Lead Conversations', 'Talk to Listen Ratio'];

  progressPercent = 87;
  timeTaken = 0;
  searchQuery = '';
  selectedFilter = 'Overall';
  selectedTimeframe = 'This Month';

  getPodiumMarginTop(index: number): string {
    if (index === 0) return '30px';
    if (index === 2) return '60px';
    return '0';
  }

  options = ['A', 'B', 'C', 'D'];
  clickedOption: string | null = null;
  liveQuestion$!: Observable<any[]>;
  liveData: any = {};
  attempted: any = false;
  leaderBoard: any = [];
  allUser:any = [];

  top1: any = false;
  top2: any = false;
  top3: any = false;

  addedAt:any = 0;



  constructor(
    private _questionService: QuestionsService,
    private toastr: ToastrService,
    private userData: AuthService
  ) { }

  ngOnInit(): void {
    this.liveQuestion$ = this._questionService.getLiveQuestion();

    this.liveQuestion$.subscribe((q: any[]) => {
      // Assuming you want the first live question
      this.liveData = q[0];
      if(this.liveData) {
        this.addedAt = this.liveData?.addedAt 
      }
      let leaderboard = this.liveData?.leaderboard ?? [];
      this.leaderBoard = [];
      this.allUser = [];
      this.timeTaken = Date.now() - q[0]?.addedAt
      Object.keys(leaderboard).forEach(key => {
        const user = leaderboard[key];
        if (user.isCorrect) {
          this.leaderBoard.push(user);
        }
        this.allUser.unshift(user);
      });
      this.top1 = this.leaderBoard[0] ?? false;
      this.top2 = this.leaderBoard[1] ?? false;
      this.top3 = this.leaderBoard[2] ?? false;
    });
  }


  timeInSeconds(attemptAt:any){
    console.log(attemptAt);
    if(!!attemptAt) {
      if(this.addedAt>attemptAt) {
        return Math.floor((this.addedAt - attemptAt) / 1000) + "(s)";
      } else {
        return Math.floor((attemptAt - this.addedAt) / 1000) + "(s)";
      }
    } else {
      return "-- --";
    }
  }


}
