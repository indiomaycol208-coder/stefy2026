import { Component, ViewChild, ElementRef } from '@angular/core';
import { MensajeChat } from '../../../models/chat';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  nombre:string="Maycol Esneider Posadaa"
  email:string="maycolesneider@gmail.com"
  mensajes: MensajeChat[]=[]
  cargandoHistorial=false
  asistenteEscribiendo=false
  enviandoMensaje=false
  mensajeTexto=""
  debeHacerScroll=true

  //referenciar a los contenedores
  @ViewChild('messagesContainer') messagesContainer! : ElementRef

  private scrollHaciaAbajo():void{
    try{
      const container = this.messagesContainer?.nativeElement;
      if(container){
        container.scrollTop = container.scrollHeight;
      }
    }catch(error){
      console.error('❎❎Error al hacer scroll hacia abajo');

    }
  }


  ngAfterViewChecked(){
    if(this.debeHacerScroll){
      this.debeHacerScroll=false;
      this.scrollHaciaAbajo();
    }
  }

  manejoErrorImagen(){

  }
  cerrarSesion(){}

  trackByMensaje(index: number, mensaje :MensajeChat){

  }
  formatearMensajeAsistente(contenido:string){
    return contenido
    .replace(/\n/g,'<br>')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
  }



  formmatearHora(fecha:Date): string{
    return fecha.toLocaleTimeString('es-ES',{
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  enviarMensaje(){}

  ngOnInit(){
    this.mensajes = this.generarMensajeDemo();
  }

  private generarMensajeDemo():MensajeChat[]{
    const ahora = new Date();

    return [
      {
        id:'id1',
        contenido:'Hola eres el asistente',
        tipo:'Usuario',
        fechaEnvio: new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'uid'
      }
      ,{
        id:'id2',
        contenido:'Hola soy tu asistente',
        tipo:'Asistente',
        fechaEnvio:new Date(ahora.getTime()),
        estado:'Error',
        usuarioId:'a1'
      },
      {
        id:'id1',
        contenido:'¿Podrías ayudarme con mis tareas?',
        tipo:'Usuario',
        fechaEnvio: new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'uid'
      },
      {
        id:'id2',
        contenido:'Claro, solo dime que necesitas',
        tipo:'Asistente',
        fechaEnvio:new Date(ahora.getTime()),
        estado:'Error',
        usuarioId:'a1'
      },
      {
        id:'id1',
        contenido:'Necesito un ensayo acerca del día de la independencia',
        tipo:'Usuario',
        fechaEnvio: new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'uid'
      },
      {
        id:'id2',
        contenido:'Claro, algún otro requisito (cantidad mínima de palabras)',
        tipo:'Asistente',
        fechaEnvio:new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'a1'
      },
      {
        id:'id1',
        contenido:'Mínimo 1000 palabras',
        tipo:'Usuario',
        fechaEnvio: new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'uid'
      },
      {
        id:'id2',
        contenido:'Aquí está el ensayo ',
        tipo:'Asistente',
        fechaEnvio:new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'a1'
      },
      {
        id:'id1',
        contenido:'¡Gracias! ¿Cuál es tu nombre?',
        tipo:'Usuario',
        fechaEnvio: new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'uid'
      },
      {
        id:'id2',
        contenido:'Mi nombre es Maikoll',
        tipo:'Asistente',
        fechaEnvio:new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'a1'
      },
      {
        id:'id1',
        contenido:'¡Excelente! ¿Cuál es tu email?',
        tipo:'Usuario',
        fechaEnvio: new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'uid'
      },
      {
        id:'id2',
        contenido:'Maikolldtf@gmail.com',
        tipo:'Asistente',
        fechaEnvio:new Date(ahora.getTime()),
        estado:'Enviado',
        usuarioId:'a1'
      },
      
      

    ]
  }

}
