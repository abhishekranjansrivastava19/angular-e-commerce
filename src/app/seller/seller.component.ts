import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp, User } from '../model/data';
import { CallApiService } from '../services/call-api.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent {
  form:FormGroup
  constructor(private seller: CallApiService, private router: Router, private fb: FormBuilder){

  this.form = this.fb.group({
    'email': ['', [Validators.required]],
    'password': ['', [Validators.required]],
  })
  }
  showLogin = false;
  authError:string = ''
  ngOnInit(): void{
    this.seller.reloadSeller()
  };
  signUp(data:SignUp):void{
    this.seller.userSignUp(data)
    };
  login(): void{
      this.seller.userLogin(this.form.value.email, this.form.value.password)
      this.seller.isLoginError.subscribe((isError)=>{
        if(isError){
           this.authError = 'Email or Password is not correct'
        }
      })
      };
  openLogin(){
    this.showLogin = true
  };
  openSignUp(){
    this.showLogin = false
  };

}

