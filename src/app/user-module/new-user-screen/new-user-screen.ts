import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { authGuard } from '../../auth.guard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './new-user-screen.html',
  styleUrl: './new-user-screen.css'
})
export class NewUserScreen {
  emailErrorMessage!: string;
  passwordErrorMessage!: string;
  sucessLogin!: string;
  incorrectCredentials!: string;
  nameErrorMessage!:string;
  newPasswordErrorMessage!: string;

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
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.sucessLogin = "";
    this.incorrectCredentials = "";
    this.nameErrorMessage = "";
    this.newPasswordErrorMessage = "";

    if (this.newUserLoginForm.value.name == "") {
      this.nameErrorMessage = "O campo de nome e obrigatorio.";
      return
    }

    if (this.newUserLoginForm.value.email == "") {
      this.emailErrorMessage = "O campo de e-mail e obrigatorio.";
      return
    }

    if (this.newUserLoginForm.value.password == "") {
      this.passwordErrorMessage = "O campo de senha e obrigatorio.";
    }else if(this.newUserLoginForm.value.password.length <= 6) {
      this.passwordErrorMessage = "O campo de senha tem que ser maior que 6 caracter";
    }
     console.log("cheguei aqui ",this.newUserLoginForm.value.password.length)

    if (this.newUserLoginForm.value.password != this.newUserLoginForm.value.newPassword) {
      this.newPasswordErrorMessage = "A senha nao esta compativel .";
      return
    }

    console.log("Email", this.newUserLoginForm.value.email)
    console.log("Password", this.newUserLoginForm.value.password)
    
    const token = localStorage.getItem("meuToken")
    console.log("cheguei",token)

    
    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: this.newUserLoginForm.value.name,
        email: this.newUserLoginForm.value.email,
        password: this.newUserLoginForm.value.password,
        newPassword: this.newUserLoginForm.value.newPassword,
        
      }),
    });

    debugger

    if (response.status >= 200 && response.status <= 299) {
      this.sucessLogin = "Logado com sucesso.";
      let json = await response.json();
      console.log("JSON", json)
      window.location.href = "login"
    } else {
      this.incorrectCredentials = "Credenciais incorretas";
    }     
  }
}
