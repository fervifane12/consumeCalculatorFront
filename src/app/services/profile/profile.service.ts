import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url:string ="http://localhost:8080/user"
  
  constructor(private http:HttpClient) { }

  createUser(data:Profile): Observable<Profile>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<Profile>(this.url, data, {headers})
  }

  getUserList():Observable<Profile[]>{
    return this.http.get<Profile[]>(this.url)
  }

  getUser(userId:string):Observable<Profile>{
    return this.http.get<Profile>(`${this.url}/${userId}`)
  }

  updateUser(userId:string, data:Profile):Observable<Profile> {
    const headers = new HttpHeaders({
      'Conten-Type': 'application/json'
    });
    return this.http.put<Profile>(`${this.url}/${userId}`, data, {headers});
  }
}
