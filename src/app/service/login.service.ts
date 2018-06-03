import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL = "src/app/JSON/login.json";

  constructor(private http: Http) {
    console.log("Books Service created...")
  }

  setAuthentication(){
    return this.http.get("./assets/loginData.json");
  }

}
