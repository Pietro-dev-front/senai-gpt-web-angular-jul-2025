import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


interface IChat {
  chatTitle: string;
  id: number;
  userId: string
}

interface IMessages {
  chatId: number;
  id: number;
  text: string;
  userId: string
}

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css'
})
export class ChatScreen {

  chats: IChat[];
  chatSelecionado: IChat;
  messages: IMessages[];
  userMessage = new FormControl("");

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
    this.chats = [];
    this.chatSelecionado = null!;
    this.messages = [];

  }

  ngOnInit() {
    this.getChats();

  }

  async getChats() {
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }
    }))

    if (response) {
      this.chats = response as [];
      console.log("Chats", this.chats);
    } else {
      console.log("Chat", response)
    }

    this.cd.detectChanges();

  }

  async onChatClick(chatClicado: IChat) {

    console.log("ChatClicado", chatClicado)

    this.chatSelecionado = chatClicado;

    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" +
      chatClicado.id, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }
    }));

    console.log("Mensagens", response);

    this.messages = response as [];

    this.cd.detectChanges();

  }

  async sendMessage() {

    let newMessageUser = {
      chatId: this.chatSelecionado.id,
      userId: localStorage.getItem("meuId"),
      text: this.userMessage.value

    };

    let newMessageUserResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", newMessageUser, {
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      },

    }));

    await this.onChatClick(this.chatSelecionado);

    //enviar mensagem para a IA responder.

    let respostaIAResponse = await firstValueFrom(this.http.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      "contents": [
        {
          "parts": [
            {
              "text": this.userMessage.value +". Me de uma resposta objetiva"
            }
          ]
        }
      ]
    },{
      headers:{
        "content-type":"application;json",
        "x-goog-api-key":"AIzaSyDV2HECQZLpWJrqCKEbuq7TT5QPKKdLOdo"
      }
    })) as any;

    let newAnswerIA = {
      chatId: this.chatSelecionado.id,
      userId: "chatbot",
      text: respostaIAResponse.candidates[0].content.parts[0].text
    }

    let newMessageIAResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", newAnswerIA, {
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      },
    }));
          await this.onChatClick(this.chatSelecionado);
          this.userMessage.setValue("");
  }
}
