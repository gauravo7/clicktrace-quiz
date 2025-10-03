import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    errorMsg: string = '';
  constructor(
    private _student:StudentService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService
  ) { }

  formGroup = new FormGroup({
    contact: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    this.spinner.show();
    const formValue = this.formGroup.value;
    if(this.formGroup.valid) {
      const { contact, password } = this.formGroup.value;
      this._student.loginCheck(contact!, password!).subscribe(user => {
        if (user) {
          alert('Login Successful!');
          this.authService.clearData();
          this.authService.setData(user);
          this.router.navigate(['/race']);
        } else {
          this.errorMsg = 'Invalid contact or password!';
          this.toastr.error(this.errorMsg);
        }
      }, err => {
        console.error(err);
        this.errorMsg = 'Something went wrong!';
        this.toastr.error(this.errorMsg);
      });
    }
  }

}
