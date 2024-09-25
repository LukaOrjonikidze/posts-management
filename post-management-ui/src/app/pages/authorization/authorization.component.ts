import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  authForm: FormGroup;
  isRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isRegister = false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.isRegister = data['type'] === 'register';
      if (this.isRegister) {
        this.authForm.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
      } else {
        this.authForm.removeControl('email');
      }
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const { username, password, email } = this.authForm.value;

    if (this.isRegister) {
      this.authService.register(username, email, password).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error(err)
      });
    } else {
      this.authService.login(username, password).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error(err)
      });
    }
  }
}