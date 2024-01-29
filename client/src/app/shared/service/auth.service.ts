import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { LocalstorageService } from './localstorage.service';
import { AuthRequest, AuthResponse } from '../model/auth';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private localStorageService: LocalstorageService, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.localStorageService.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      tap((response: User) => {
        console.log(response, "response from register");
      }),
      switchMap(() => {
        const authRequest: AuthRequest = {
          username: user.username,
          password: user.password 
        };
        return this.authenticate(authRequest);
      })
    );
  }

  authenticate(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, authRequest).pipe(
      tap((response: AuthResponse) => {
        const userData = {
          username: response.user.username,
          userId: response.user.userId,
          userRole: response.user.role[0].title
        };
        const jwtToken = response.jwtToken;
        this.localStorageService.setItem('currentUser', userData);
        this.localStorageService.setItem('jwtToken', jwtToken);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout() {
    this.localStorageService.removeItem('currentUser');
    this.localStorageService.removeItem('jwtToken');
    this.currentUserSubject.next(null);
  }
}