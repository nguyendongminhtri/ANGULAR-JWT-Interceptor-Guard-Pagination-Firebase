import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {SignInForm} from '../model/SignInForm';
import {JwtResponse} from '../model/JwtResponse';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //API SERVER
  private API_SIGNUP = environment.API_SERVER+'signup';
  private API_SIGNIN = environment.API_SERVER+'signin';
  constructor(private http: HttpClient) { }
  signUp(signUp: SignUpForm): Observable<any>{
    return this.http.post<any>(this.API_SIGNUP, signUp);
  }
  signIn(signIn: SignInForm): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.API_SIGNIN,signIn)
  }
  loggined() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(NAME_KEY);
    const authority = sessionStorage.getItem(ROLE_KEY);
    if (username && token && authority) {
      return true;
    }
    return false;
  }
}
