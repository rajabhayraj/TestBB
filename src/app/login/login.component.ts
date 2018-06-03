import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = "Angular Test Application BB";
  message = "";

  complexForm: FormGroup;
  loginInfo : any;

  constructor(fb: FormBuilder, private loginService : LoginService,private router: Router) {
    // Here we are using the FormBuilder to build out our form.
    this.complexForm = fb.group({
      'password': ["", Validators.required],
      'email': ["", Validators.compose(
        [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.email
        ])]
    });
  }
  submitForm(form: any): void {
    // debugger;
    console.log('Reactive Form Data: ');
    console.log(form);

    this.loginService.setAuthentication().subscribe(response => {
      console.log(response);
      this.loginInfo = response;
      this.loginInfo = JSON.parse(this.loginInfo._body);
      if(form.email == this.loginInfo.email && form.password == this.loginInfo.password){
        this.router.navigateByUrl('/books')
      }else{
        this.message = "Please check username and password."
      }
    }, error => this.message = error);
  }


  ngOnInit() {
  }

}
