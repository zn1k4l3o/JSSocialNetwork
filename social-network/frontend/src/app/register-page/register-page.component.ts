import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  registerData!: FormGroup;
  errorText: string | null = null;
  constructor(public auth: AuthenticationService) {}

  ngOnInit(): void {
    this.registerData = new FormGroup({
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      hasAdmin: new FormControl(false),
      password: new FormControl('', [Validators.required]),
      passwordRepeat: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    if (this.registerData.valid) {
      if (
        this.registerData.value.password ==
        this.registerData.value.passwordRepeat
      ) {
        await this.auth.register(
          {
            username: this.registerData.value.username,
            name: this.registerData.value.name,
            surname: this.registerData.value.surname,
            email: this.registerData.value.email,
            password: this.registerData.value.password,
            hasAdmin: this.registerData.value.hasAdmin,
          },
          () => {
            this.errorText = this.auth.errorMessage;
          }
        );
      } else this.errorText = 'Passwords do not match!';
    } else
      this.errorText =
        'Make sure to fill all the fields and write email properly.';
  }
}
