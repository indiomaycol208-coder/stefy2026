import { Injectable, inject } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { map } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private auth = inject(Auth);
  
  // Observable para obtener el usuario autenticado
  usuario$ = user(this.auth);

  //variable observable que devuelve true o false dependiendo si el usuario esta autenticado
  estaAutenticado$ = this.usuario$.pipe(
  map(usuario => !!usuario)
  )



  //funcion para iniciar sesion 
  async iniciarSesion(): Promise<Usuario | null>{
    try{
      console.log('Inicio el sericio funcion iniciar sesion')
      const proveedor = new GoogleAuthProvider;

      //controladores
      proveedor.addScope('email');
      proveedor.addScope('profile');

      console.log("antes")
      const resultado = await signInWithPopup(this.auth, proveedor);
      console.log("despues")  
      const usuarioFirebase = resultado.user;
      if(usuarioFirebase){
        const usuario: Usuario ={
          uid: usuarioFirebase.uid,
          nombre: usuarioFirebase.displayName || 'Usuario sin nombre',
          email: usuarioFirebase.email || '',
          fotoUrl: usuarioFirebase.photoURL || undefined,
          fechaCreacion: new Date(),
          ultimaConexion: new Date()
        }
        return usuario;
      }
      return null;
    }catch(error){
      console.error('❎❎Error al iniciar sesion');
     throw error;
    }
  }

  obtenerUsuario(): User | null{
    return this.auth.currentUser;
  }

  //Cerrar sesion
}
