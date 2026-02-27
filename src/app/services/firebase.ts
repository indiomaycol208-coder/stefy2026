import { Injectable, inject } from '@angular/core';
import { Firestore, collection, Timestamp, addDoc} from '@angular/fire/firestore';
import { MensajeChat } from '../../models/chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);
  
  //Funcion para guardar un mensaje en la base de datos
  async guardarMensaje(mensaje: MensajeChat): Promise<void>{ 
    try{
      //revisar si viene sin usuarioid
      if( mensaje.usuarioId){
        //devuelve que el mensaje debe tener un usuario id
        throw new Error('usuario id es requerido');

      }else if(mensaje.contenido){
        //revisar si el mensaje viene sin contenido
        throw new Error('El contenido del mensaje es requerido');
      }else if(mensaje.tipo){
        //revisar si el mensaje viene sin tipo
        throw new Error('El tipo de mensaje es requerido');
      }
      //si el mensaje es valido, se guarda en la base de datos
      const collecionMensajes = collection(this.firestore, 'Mensajes');
      // prepara el mensaje
      const mensajeGuardar = {
        usuarioId : mensaje.usuarioId,
        contenido : mensaje.contenido,
        tipo: mensaje.tipo,
        estado: mensaje.estado,
        //fecha es de tipo timestamp y necesito pasarla a  date
        fechaEnvio: Timestamp.fromDate(mensaje.fechaEnvio)



      };

      //anañadir el mensaje a la collecion, generar un  documento  en la collecion
      const docRef = await addDoc(collecionMensajes, mensajeGuardar);



    }   catch(error: any){

      console.error('✖️✖️Error al guardar el mensaje en firebase')
      console.error('error details', {
        message: error.message,
        code: error.code,
        stack: error.stack
      })
      
  }
}
obtenerMensajesUsuario(userId: int):  Observable${ 
  //filrtrar que los mensajes que se muestran sean los mensajes del usuario autenticado
  
}
}
