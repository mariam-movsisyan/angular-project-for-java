import { Injectable } from '@angular/core';
import { ENG } from '../translations/english';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public errors: any[] = []
  
  private baseUrl = 'http://localhost:8080/JavaProject';

  constructor(private http: HttpClient) { }

  public signUp(user: IUser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/register`, JSON.stringify(user), { headers });
  }


  public signIn(user: IUser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/login`, JSON.stringify(user), { headers });
  }


  public getErrors() {
    return this.errors;
  }


}
