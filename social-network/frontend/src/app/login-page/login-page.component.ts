import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  public loginData!: FormGroup;
  errorText: string | null = null;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.loginData = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginData.valid) {
      this.auth.login(
        this.loginData.value.username,
        this.loginData.value.password,
        () => {
          this.errorText = this.auth.errorMessage;
        }
      );
    } else this.errorText = 'Please enter username and password.';
  }
}
