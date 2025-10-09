import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {


    constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _student:StudentService,
    private authService:AuthService
  ) { }

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]),
    rollNo: new FormControl('', [Validators.required]),
    // password: new FormControl('', [Validators.required]),
    // college: new FormControl('', [Validators.required]),
    // branch: new FormControl('', [Validators.required]),
    // course: new FormControl('', [Validators.required]),
    // semester: new FormControl('', [Validators.required]),
  });

  submit() {
    this.spinner.show();
    const formValue = this.formGroup.value;
    if(this.formGroup.valid) {
      this._student.register(this.formGroup.value).then(() => {
          // alert('User saved successfully!');
          this.authService.setData(this.formGroup.value);
          this.toastr.success('User Verified !!');
          this.router.navigate(['/race']);
      });
    }else{
      this.toastr.error("Invalid input")
    }
  }


}
