import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginScreenService } from '../../service/login-screen-service';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  isBotaoDesabilitado: boolean = false;
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private loginScreenService: LoginScreenService, ) {
    //quando a tela iniciar 
    this.loginForm = this.fb.group({
      email: [" ",[Validators.required] ],
      password: [" ", Validators.required]
    });
  };

  
   habilitarBotao() {
    this.isBotaoDesabilitado = false;
  }
  
  desabilitarBotao() {
    this.isBotaoDesabilitado = true;
  }


  async onLoginClick(){

   

    if (this.loginForm.value.email == "") {
      alert("preencha o e-mail");
      return
    }

    if (this.loginForm.value.password == "") {
      alert("preencha o password");
      return
    }
    
    console.log("Email", this.loginForm.value.email)
    console.log("Password", this.loginForm.value.password)

    let response = await this.loginScreenService.getLoginScreen(this.loginForm.value.email.get('email'),this.loginForm.value.password.get('password'))

    if(response.status === 200){
      alert("sucesso no login")
    }else{
      alert("Error de api ")
    }

    console.log("STATUS CODE ", response.status)

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
