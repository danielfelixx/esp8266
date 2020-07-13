import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    public http: Http
  ) { }

  get(url){
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe((result:any)=>{
        resolve (result.json());
      },(error)=>{
        reject(error.json());
      })
    })
  }

}
