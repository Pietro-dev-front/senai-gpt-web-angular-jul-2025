import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginScreenService } from '../../service/login-screen-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  emailErrorMessage: string;
  passwordErrorMessage: string;
  sucessLogin: string;
  incorrectCredentials: string;

  isBotaoDesabilitado: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginScreenService: LoginScreenService, private cd: ChangeDetectorRef,) {
    //quando a tela iniciar
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],

    });

    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.sucessLogin = "";
    this.incorrectCredentials = "";
  };


  // habilitarBotao() {
  //   this.isBotaoDesabilitado = false;
  // }

  // desabilitarBotao() {
  //   this.isBotaoDesabilitado = true;
  // }


  async onLoginClick() {
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.sucessLogin = "";
    this.incorrectCredentials = "";

    if (this.loginForm.value.email == "") {
      this.emailErrorMessage = "O campo de e-mail e obrigatorio.";
      return
    }

    if (this.loginForm.value.password == "") {
      this.passwordErrorMessage = "O campo de senha e obrigatorio.";
      return
    }

    console.log("Email", this.loginForm.value.email)
    console.log("Password", this.loginForm.value.password)

    let response = await this.loginScreenService.getLoginScreen(this.loginForm.value.email, this.loginForm.value.password)

    if (response.status === 200 && response.status <= 299) {
      this.sucessLogin = "Logado com sucesso.";
      let json = await response.json();
      console.log("JSON", json)
      let meuToken = json.accessToken;
      let userId = json.user.id;
      localStorage.setItem("meuToken", meuToken);
      localStorage.setItem("meuId",userId);
      window.location.href = "chat-screen"
    } else {
      this.incorrectCredentials = "Credenciais incorretas";
    }


    this.cd.detectChanges();
    // console.log("STATUS CODE ", response.status)

    //  let response = await fetch("https://senai-gpt-api.azurewebsites.net/login",{
    //   method: "POST",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     email: this.loginForm.value.email,
    //     password: this.loginForm.value.password
    //   })
    // });

  }
}
