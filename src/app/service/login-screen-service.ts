import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginScreenService {

  async getLoginScreen(email : string, password : string){

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password
      })
    });

    return response;
  }
}
