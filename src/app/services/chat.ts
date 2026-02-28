import { inject, Injectable } from '@angular/core';
import { ConversacionChat, MensajeChat } from '../../models/chat';
import { AuthService } from './auth';
import { FirebaseService } from './firebase';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

//vamos a generar un mod del servicio de gemini
const geminiServiceMock = {
  convertirHistorial : (historial: MensajeChat[]) => historial,
  enviarMensaje : async (contenido: string, historial: any)=>'Respuesta desde el servicio de gemini tipo MockLocationStrategy, esta respuesta siempre sera igual'
}
  export class ChatService {
    private authService = inject(AuthService);

    private firebaseService = inject(FirebaseService);

    private mensajeSubject = new BehaviorSubject<MensajeChat[]>([]);
    public mensajes$ = this.mensajeSubject.asObservable(); 

    private cargandoHistorial = false;

    private asistenetRespondiendo = new BehaviorSubject<boolean>(false);

    private asistenteRespondiendo$ = this.asistenetRespondiendo.asObservable();

    async  InicializarChat(usuarioId: string) : Promise<void> {
      if (!this.cargandoHistorial) {
      return;
      }
      this.cargandoHistorial = true;
      try {
       this.firebaseService.obtenerMensajesUsuario(usuarioId).subscribe({
         next: (mensajes) => {
          //actualizando el behavior subject con los mensajes obtenidos
          this.mensajeSubject.next(mensajes);
          this.cargandoHistorial = false;
         },
          error: (error) => {
            console.error('✖️ error al cargar historial', error);
            this.cargandoHistorial = false;
            //cargar con una lista vacia del behavior subject
            this.mensajeSubject.next([]);
          }
       });

      } catch (error) {
       
      } 
    }


  
}
