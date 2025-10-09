import { Component } from '@angular/core';
import { Quiz, TodoItem } from '../../services/quiz';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsService } from '../../services/questions/questions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-projector',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './manage-projector.html',
  styleUrl: './manage-projector.css',
})
export class ManageProjector {
  constructor(
    private _questionService: QuestionsService,
    private toastr: ToastrService
  ) { }

  question: string = '';
  options: string[] = ['', '', '', '']; // always 4 options
  correctOptionIndex: number | null = null; // stores selected correct answer

  questions$!: Observable<any[]>;
  liveQuestion$!: Observable<any[]>;
  questionsList: any = [];
  liveData:any = [];

  // 🔹 Image upload variables
  questionImage: string | null = null; // Cloudinary URL
  imageFile: File | null = null;

  async onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];

      try {
        this.toastr.info("Uploading image...", "Please wait");

        // Upload to Cloudinary
        const cloudName = "djx2edbwi";
        const uploadPreset = "vAssistant";

        const formData = new FormData();
        formData.append("file", this.imageFile);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.secure_url) {
          this.questionImage = data.secure_url; // Save Cloudinary URL
          this.toastr.success("Image uploaded successfully");
        } else {
          this.toastr.error("Image upload failed");
        }
      } catch (err) {
        console.error(err);
        this.toastr.error("Error uploading image");
      }
    }
  }

  ngOnInit(): void {
    this.questions$ = this._questionService.getQuestions();

    this.questions$.subscribe((q: any[]) => {
      if (!q || q.length === 0) return;
      this.questionsList = q;
      console.log(this.questionsList);
    });

    this.liveQuestion$ = this._questionService.getLiveQuestion();
     this.liveQuestion$.subscribe((q: any[]) => {
      // Assuming you want the first live question
      this.liveData = q[0];
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  resetForm() {
    this.question = '';
    this.options = ['', '', '', ''];
    this.correctOptionIndex = null;
    this.removeImage();
  }

  removeImage() {
    this.questionImage = null;
    this.imageFile = null;
  }

  submitQuestion() {
    if (this.isFormValid()) {
      let data: any = {
        question: this.question,
        options: this.options,
        correctAnswer: this.correctOptionIndex ?? -1,
        image: this.questionImage ?? null,
      };

      this._questionService
        .addQuestion(data)
        .then(() => {
          this.toastr.success('Question Added Successfully');
          this.resetForm();
        })
        .catch(console.error);
    } else {
      this.toastr.error(
        'Please fill in the question, all 4 options, and select the correct option.'
      );
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
        this.toastr.success('Question Deleted Successfully');
      })
      .catch(console.error);
  }

  stopLive(id: number) {
    this._questionService
      .stopLiveQuestion()
      .then(() => {
        this.toastr.success('Stopped!! Choose Next Question');
      })
      .catch(console.error);
  }

   showOptions(id: number) {
    this._questionService
      .showOptions(id)
      .then(() => {
        this.toastr.success('Options Lived !!');
      })
      .catch(console.error);
  }


}
