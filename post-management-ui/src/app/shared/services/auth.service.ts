import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ResultModel } from '../../models/result.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }


  register(username: string, email: string, password: string): Observable<ResultModel<string>> {
    return this.httpClient.post<ResultModel<string>>(`${this.apiUrl}/account/register`, { username, email, password });
  }

  login(username: string, password: string): Observable<ResultModel<string>> {
    return this.httpClient
    .post<ResultModel<string>>(`${this.apiUrl}/account/login`, { username, password })
    .pipe(map(response => {
      const token = response.data;
      if (token) {
        localStorage.setItem('token', token);
        this.tokenSubject.next(token);
      }
      return response;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.tokenValue;
  }
}
