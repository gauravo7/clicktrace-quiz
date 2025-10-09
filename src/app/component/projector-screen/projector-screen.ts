import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NoQuestionsLoader } from '../no-questions-loader/no-questions-loader';
import { QuestionsService } from '../../services/questions/questions.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { LeaderBoardEntry } from '../../models/quiz.model';
import { Chart, registerables } from 'chart.js';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-projector-screen',
  imports: [CommonModule, NoQuestionsLoader],
  templateUrl: './projector-screen.html',
  styleUrl: './projector-screen.css',
})
export class ProjectorScreen {
  hasQuestion = 0;
  modalInstance: bootstrap.Modal | null = null;
  topThree = [
    {
      id: 2,
      name: 'John Doe',
      course: 'B.Tech',
      branch: 'CSE',
      rollNo: 252312,
      rank: 2,
      avatar: 1,
    },
    {
      id: 1,
      name: 'Rey Mibourne',
      course: 'B.Tech',
      branch: 'CSE',
      rollNo: 252312,
      rank: 1,
      avatar: 2,
    },
    {
      id: 3,
      name: 'Augusta Mitchell',
      course: 'B.Tech',
      branch: 'CSE',
      rollNo: 252312,
      rank: 3,
      avatar: 3,
    },
  ];

  leaderboardList: any[] = [
    { rank: 1, name: 'Rey Mibourne', course: 'B.Tech', branch: 'CSE', rollNo: 252312, avatar: 1 },
    { rank: 2, name: 'John Doe', course: 'B.Tech', branch: 'CSE', rollNo: 222322, avatar: 2 },
    {
      rank: 3,
      name: 'Augusta Mitchell',
      course: 'B.Tech',
      branch: 'CSE',
      rollNo: 623323,
      avatar: 3,
    },
    { rank: 4, name: 'Rey Mibourne', course: 'B.Tech', branch: 'CSE', rollNo: 224332, avatar: 1 },
    { rank: 5, name: 'Rey Mibourne', course: 'B.Tech', branch: 'CSE', rollNo: 343455, avatar: 2 },
  ];

  achievements: any[] = [{ level: 1 }, { level: 2 }, { level: 3 }, { level: 4 }];
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
  allUser: any = [];

  top1: any = false;
  top2: any = false;
  top3: any = false;

  totalCorrect:any = 0;
  totalIncorrect:any = 0;

  addedAt: any = 0;
  chart: Chart | null = null;
  chart1: Chart | null = null;



  constructor(
    private _questionService: QuestionsService,
    private toastr: ToastrService,
    private userData: AuthService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.liveQuestion$ = this._questionService.getLiveQuestion();

    this.liveQuestion$.subscribe((q: any[]) => {
      // Assuming you want the first live question
      this.liveData = q[0];
      if (this.liveData) {
        this.addedAt = this.liveData?.addedAt;
      }
      let leaderboard = this.liveData?.leaderboard ?? [];
      this.leaderBoard = [];
      this.allUser = [];
      this.timeTaken = Date.now() - q[0]?.addedAt;
      Object.keys(leaderboard).forEach((key) => {
        const user = leaderboard[key];
        if (user.isCorrect) {
          this.leaderBoard.push(user);
        }
        this.allUser.unshift(user);
      });

      this.totalCorrect = 0;
      this.totalIncorrect = 0;
      this.totalCorrect = this.allUser.filter((u:any) => u.isCorrect).length;
      this.totalIncorrect = this.allUser.length - this.totalCorrect;

      console.log(this.totalCorrect,this.totalIncorrect);


      this.top1 = this.leaderBoard[0] ?? false;
      this.top2 = this.leaderBoard[1] ?? false;
      this.top3 = this.leaderBoard[2] ?? false;

      if (this.chart) {
      this.chart.data.datasets[0].data = [this.totalIncorrect, this.totalCorrect];
      this.chart.update();
    } else {

    }

    if (this.chart1) {
      this.chart1.data.datasets[0].data = [this.totalIncorrect, this.totalCorrect];
      this.chart1.update();
    } else {

    }
    });

  }

  timeInSeconds(attemptAt: any) {
    if (!!attemptAt) {
      if (this.addedAt > attemptAt) {
        return Math.floor((this.addedAt - attemptAt) / 1000) + '(s)';
      } else {
        return Math.floor((attemptAt - this.addedAt) / 1000) + '(s)';
      }
    } else {
      return '-- --';
    }
  }

      createPieChart() {
        const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
        if (!ctx) return;

        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            // labels: ['Incorrect', 'Correct'],
            datasets: [
              {
                label: 'Students',
                data: [this.totalIncorrect, this.totalCorrect],
                backgroundColor: ['red', '#4C4FE8'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: { enabled: true },
            },
          },
        });
      }


   createPieChart2() {

        const ctx = document.getElementById('myPieChart1') as HTMLCanvasElement;
        if (!ctx) return;

        this.chart1 = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Incorrect', 'Correct'],
            datasets: [
              {
                label: 'Students',
                data: [this.totalIncorrect, this.totalCorrect],
                backgroundColor: ['red', '#4C4FE8'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: { enabled: true },
            },
          },
        });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'o') {
      event.preventDefault(); // prevent default select all
      this.openModal();
    }
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  //  openModal() {
  //   const modalElement = document.getElementById('myModal');
  //   if (modalElement) {
  //     const modal = new bootstrap.Modal(modalElement);
  //     modal.show();
  //   }

  openModal() {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      if (!this.modalInstance) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
      this.modalInstance.show();
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  ngAfterViewInit() {
    this.createPieChart();
    const modalEl = document.getElementById('myModal');
    if (modalEl) {
      modalEl.addEventListener('shown.bs.modal', () => {
        this.createPieChart2();
      });
    }
  }



}
