import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface IChat {
  chatTitle: string;
  id: number;
  userId: string;
}

interface IMessage {   
  chatId: number;
  id: number;
  text: string;
  userId: string;
}

@Component({
  selector: 'app-chat-screen',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css'
})
export class ChatScreen {
  chats: IChat[];
  chatSelecionado: IChat;
  mensagens: IMessage[]; 
  mensagemUsuario = new FormControl("");

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = []; 
  }

  ngOnInit() {
    this.getChats();
  }

  async getChats() {
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }
    }));
    if (response) {
      this.chats = response as [];
    }
    else {
      console.log("Erro ao bsucar os chats");
    }
  }

  async onChatClick(chatClicado: IChat) {
    console.log("Chat clicado", chatClicado);
    this.chatSelecionado = chatClicado;
    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" + chatClicado.id, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuToken")
      }
    }));
    console.log("MENSAGENS", response);
    this.mensagens = response as IMessage[]; // Cast adicionado para garantir o tipo correto
    this.cd.detectChanges();
  }

  async enviarMensagem() {

    let novaMensagemUsuario = {
      chatId:this.chatSelecionado.id,
      userId: localStorage.getItem("meuId"),
      text: this.mensagemUsuario.value,
    }

  }
}