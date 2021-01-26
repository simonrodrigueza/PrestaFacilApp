import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = 'https://prestaafacil.herokuapp.com/';
  constructor(private http: HttpClient,
              private router:Router) { }

  getUsuario(userId){
    return this.http.get<any>(this.URL + 'usuario/id_user/'+userId); // devuelve un observable
  }
  update(user, userID){
    return this.http.put<any>(this.URL + 'usuario/id_user/'+ userID, user);
  }


}
