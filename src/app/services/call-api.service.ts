import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUp, User } from '../model/data';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})


export class CallApiService {
   isSellerLoggedIn = new BehaviorSubject<boolean>(false)
   isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router, private Localstorage: LocalstorageService) { }

  userSignUp(data:SignUp){
    return this.http.post('http://localhost:3000/api/v1/users/register',data, {observe: 'response'})
    .subscribe((result)=>{
      this.isSellerLoggedIn.next(true)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
      console.log('result',result)
    });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(email: string, password: string){
    return this.http.post<User>(`http://localhost:3000/api/v1/users/login`,{email ,password})
   .subscribe((result: any)=>{
    if(result && result.body && result.body.length){
      console.log('user logged in...')
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.Localstorage.setToken(User.token);
      this.router.navigate(['seller-home'])
    } else {
      console.log('login failed')
      this.isLoginError.emit(true)
    }
   })
  }
}
