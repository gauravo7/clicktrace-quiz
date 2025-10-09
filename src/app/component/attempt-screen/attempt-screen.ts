import { Component } from '@angular/core';
import { NoQuestionsLoader } from "../no-questions-loader/no-questions-loader";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { QuestionsService } from '../../services/questions/questions.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-attempt-screen',
  imports: [NoQuestionsLoader,CommonModule],
  templateUrl: './attempt-screen.html',
  styleUrl: './attempt-screen.css'
})
export class AttemptScreen {

   hasQuestion = false;
  options = ['A', 'B', 'C', 'D'];
  clickedOption: string | null = null;
  liveQuestion$!: Observable<any[]>;
  liveData:any = {};
  attempted:any = false;


  constructor(
    private _questionService: QuestionsService,
    private toastr:ToastrService,
    private userData:AuthService
  ) {}


  ngOnInit(): void {
      this.liveQuestion$ = this._questionService.getLiveQuestion();

       this.liveQuestion$.subscribe((q: any[]) => {
       if (!q || q.length === 0) return;

        // Assuming you want the first live question
        this.liveData = q[0];

        const searchName = this.userData.getData()?.name??"" // Name to check
        let attemptFound = false;

          if (this.liveData.leaderboard) {
            const leaderboard = this.liveData.leaderboard;
            Object.keys(leaderboard).forEach(key => {
              const user = leaderboard[key];
              if (user.name && user.name.toLowerCase() === searchName.toLowerCase()) {
                   attemptFound = true;
              }
            });
          }

          if(attemptFound) {
            this.attempted = true;
          } else {
            this.attempted = false;
          }
    });

  }

  onButtonClick(option: any): void {
   this.attempted = true;
    if(option==this.liveData.correctAnswer) {
      const user:any = this.userData.getData();
      user.isCorrect = true;
      user.attemptAt = Date.now();
      this._questionService.saveAnswertoLeaderBoard(user);
    } else {
      // this.toastr.error("Wrong Answer");
      let user:any = this.userData.getData();
      user.isCorrect = false;
      user.attemptAt = Date.now();
      this._questionService.saveAnswertoLeaderBoard(user);
    }
  }

}
