import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        agree: new FormControl(false, Validators.requiredTrue),
        approve: new FormControl(false, Validators.requiredTrue),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }


  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordsDoNotMatch: true };
    }
    return null;
  }

  onSubmit() {
    
    if (this.registerForm.invalid) {
      console.log('invalid')
      return;
    }
    delete this.registerForm.value.confirmPassword;
    this.authService.createUser(
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.contact,
      this.registerForm.value.agree,
      this.registerForm.value.approve
    );
    console.log(this.registerForm.value);
  }
}
