import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  registerData = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    hasAdmin: new FormControl(false),
    password: new FormControl(''),
    passwordRepeat: new FormControl(''),
  });


  onSubmit() {
    
  }
}
