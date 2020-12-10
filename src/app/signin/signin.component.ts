import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user ={
    email:'',
    password:''
  }
  error=false;
  constructor(private authService: AuthService,
              private router:Router) { }
  ngOnInit(): void {
  }

  signIn(){
    this.authService.signIn(this.user)
      .subscribe(
        res =>{
          //console.log(res);
          if(res.message=="accedido"){
          this.error=false;
          localStorage.setItem('token', res.token);
          localStorage.setItem('myId',res.id);
          localStorage.setItem('names',res.names);
          this.router.navigate(['/update']);
          }
          else{
            this.error=true;
          }

        },
        err =>this.error=true
      )
  }

}
