import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http';
import{map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  constructor(public htp:HttpClient) { }

  postEmploye(data:any){
   return this.htp.post<any>('http://localhost:3000/posts',data).pipe(map((res)=>{
  return res
    }))
  }
 getEmploye(){
  return this.htp.get<any>('http://localhost:3000/posts').pipe(map((res)=>{
    return res;
      }))
 }

 delet(id:number){
  return this.htp.delete<any>('http://localhost:3000/posts/'+id).pipe(map((res)=>{
  return res
      }))
 }

 update(data:any,id:number){
   return this.htp.put<any>('http://localhost:3000/posts/'+id,data).pipe(map((res)=>{
     return res
   }))
 }

}
