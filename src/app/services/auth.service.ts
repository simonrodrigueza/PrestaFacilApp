import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'https://prestaafacil.herokuapp.com/';
  constructor(private http: HttpClient,
              private router:Router) { }
  signUp(user){
    return this.http.post<any>(this.URL + 'usuario', user);
    }
  signIn(user){
    return this.http.post<any>(this.URL + 'auth/login', user);
    }
  loggedIn() {
    return !!localStorage.getItem('token');
    }
  getToken(){
    return localStorage.getItem('token');
    }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('myId');
    this.router.navigate(['./signin'])
  }
}
