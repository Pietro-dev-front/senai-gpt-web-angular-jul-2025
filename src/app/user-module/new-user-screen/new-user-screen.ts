import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { authGuard } from '../../auth.guard';

@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-screen.html',
  styleUrl: './new-user-screen.css'
})
export class NewUserScreen {
  // emailErrorMessage: string;
  // newPasswordErrorMessage: string;
  // passwordErrorMessage: string;
  // nomeMensagerError: string;
  // sucessLogin: string;
  // incorrectCredentials: string;

  newUserLoginForm: FormGroup;

  constructor(private fb: FormBuilder, ) {

     this.newUserLoginForm = this.fb.group({
      name: ["",[Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],

    });
  }

  async onCadastro() {
    
    const token = localStorage.getItem("meuToken")
    console.log("cheguei",token)

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        email: this.newUserLoginForm.value.email,
        password: this.newUserLoginForm.value.password,
        name: this.newUserLoginForm.value.name,
        newPassword: this.newUserLoginForm.value.newPassword,
      }),
    });
    console.log("cheguei aqui ", authGuard())
  }
}
