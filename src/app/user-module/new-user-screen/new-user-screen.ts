import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [],
  templateUrl: './new-user-screen.html',
  styleUrl: './new-user-screen.css'
})
export class NewUserScreen {
  emailErrorMessage: string;
  newPasswordErrorMessage: string;
  passwordErrorMessage: string;
  nomeMensagerError: string;
  sucessLogin: string;
  incorrectCredentials: string;

  newUserLoginForm: FormGroup;

  constructor(private fb: FormBuilder) {

     this.newUserLoginForm = this.fb.group({
      name: ["",[Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],

    });
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.sucessLogin = "";
    this.incorrectCredentials = "";
    this.nomeMensagerError= "";
    this.newPasswordErrorMessage="";
  }

  async onCadastro() {
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.sucessLogin = "";
    this.incorrectCredentials = "";
    this.nomeMensagerError= "";
    this.newPasswordErrorMessage="";

    if (this.newUserLoginForm.value.name == "") {
      this.emailErrorMessage = "O campo de nome e obrigatorio.";
      return
    }

    if (this.newUserLoginForm.value.email == "") {
      this.emailErrorMessage = "O campo de e-mail e obrigatorio.";
      return
    }

     if (this.newUserLoginForm.value.newPassword == "") {
      this.emailErrorMessage = "O campo de nova senha e obrigatorio.";
      return
    }

    if (this.newUserLoginForm.value.password == "") {
      this.passwordErrorMessage = "O campo de senha e obrigatorio.";
      return
    }

    console.log("Email", this.newUserLoginForm.value.email)
    console.log("Password", this.newUserLoginForm.value.password)

    //this.cd.detectChanges();
    //console.log("STATUS CODE ", response.status)

    const token = localStorage.getItem("meuToken")
    console.log(token)
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

  }


}
