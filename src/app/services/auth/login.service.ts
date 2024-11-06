import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string ="http://localhost:8080/login"

  constructor(private http:HttpClient) { }

  login(credentials: LoginRequest):Observable<String>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<any>(this.url, credentials, {headers});
  }

  setSession(response: any) {
    localStorage.setItem('isLoggedIn', 'true');  // Marca al usuario como logueado
    localStorage.setItem('user', JSON.stringify(response));  // Guarda la respuesta del login (o datos útiles)
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  }
}