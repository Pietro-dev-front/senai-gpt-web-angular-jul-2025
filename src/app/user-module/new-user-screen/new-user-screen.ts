import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [],
  templateUrl: './new-user-screen.html',
  styleUrl: './new-user-screen.css'
})
export class NewUserScreen {
  

  newUserLoginForm: FormGroup;

  constructor(private fb: FormBuilder) {
     this.newUserLoginForm = this.fb.group({
      nome: ["",[Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],

    });
  }
}
