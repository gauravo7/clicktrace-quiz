import { Component } from '@angular/core';
import { Quiz, TodoItem } from '../../services/quiz';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsService } from '../../services/questions/questions.service';
import { ToastrService } from 'ngx-toastr';
import { update } from '@angular/fire/database';

@Component({
  selector: 'app-manage-projector',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './manage-projector.html',
  styleUrl: './manage-projector.css',
})
export class ManageProjector {


  constructor(private _questionService: QuestionsService, private toastr: ToastrService) {}


  question: string = '';
  options: string[] = ['', '', '', '']; // always 4 options
  correctOptionIndex: number | null = null; // stores selected correct answer

  questions$!: Observable<any[]>;
  questionsList: any = [];

  ngOnInit(): void {
    this.questions$ = this._questionService.getQuestions();

    this.questions$.subscribe((q: any[]) => {
      if (!q || q.length === 0) return;
      this.questionsList = q;
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  resetForm() {
    this.question = '';
    this.options = ['', '', '', ''];
    this.correctOptionIndex = null;
  }

  submitQuestion() {
    if (this.isFormValid()) {
      let data = {
        question: this.question,
        options: this.options,
        correctAnswer: this.correctOptionIndex ?? -1,
      };
      this._questionService
        .addQuestion(data)
        .then(() => {
          this.toastr.success('Question Added Successfully');
          this.resetForm();
        })
        .catch(console.error);
    } else {
      alert('Please fill in the question, all 4 options, and select the correct option.');
    }
  }

  private isFormValid(): boolean {
    return (
      this.question.trim() !== '' &&
      this.options.every((opt) => opt.trim() !== '') &&
      this.correctOptionIndex !== null
    );
  }

  live(question: any) {
    this._questionService
      .setLiveQuestion(question)
      .then(() => {
        this.toastr.success('Question is live now!');
        this.toggleIsLive(question);
      })
      .catch((err: any) => console.error(err));
  }

  // U (Update): Save changes to the item
  toggleIsLive(question: any) {
    const updatedTodo: TodoItem = {
      ...question,
      isLive: true,
    };
    this._questionService
      .updateQuestion(updatedTodo)
      .then(() => {
        this.toastr.success('Question Live');
        return;
      })
      .catch(console.error);
  }

  nextId: number = 1;

  trackById(index: number, item: any): number {
    return item.id;
  }

  toggleAccordion(selected: any) {
    this.questionsList.forEach((q: any) => {
      if (q.id === selected.id) {
        q.expanded = !q.expanded;
      } else {
        q.expanded = false;
      }
    });
  }

  deleteQuestion(id: number) {
    this._questionService
      .deleteQuestion(id)
      .then(() => {
        this.toastr.success('Question Delete Successfully');
      })
      .catch(console.error);
  }

  liveQuestion(id: number) {
    
  }

  stopLive(id: number) {
    this._questionService.stopLiveQuestion().then(() => {
        this.toastr.success('Stopped!! Choose Next Question');
      }).catch(console.error);
  }
}
