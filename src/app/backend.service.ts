import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public http: HttpClient) { }

  sendeAntrag(input){
return this.http.post("/api/antrag/registrieren",input);
  }
}
