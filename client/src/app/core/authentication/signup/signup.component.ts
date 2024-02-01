import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { AuthRequest } from 'src/app/shared/model/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';
import { LocationService } from 'src/app/shared/service/location.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  currentStep: number = 1;
  signupForm: FormGroup;
  otpForm: FormGroup;
  otp: number;
  isOTPSent: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private localstorageService: LocalstorageService, private locationService: LocationService, private snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });

    this.otp = 0;
  }

  setStep(step: number): void {
    this.currentStep = step;
  }

  generateOTP(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  public sendEmail(otp: number) {
    const templateParams = {
      message: otp
    };

    emailjs.send('service_oobe4i4', 'template_fg1qwvv', templateParams, 's8px8g5kv_n6wsVF0')
      .then((result: EmailJSResponseStatus) => {
        this.snackBar.open('Email sent successfully.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });        
      }, (error) => {
        console.log(error.text);
        this.snackBar.open('Unable to send email. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }); 
      });
  }

  submitSignupForm(): void {
    if (this.signupForm.valid) {
      const authRequest: AuthRequest = {
        username: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      this.authService.register(authRequest).subscribe(
        response => {
          this.snackBar.open('Registration successful.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.currentStep = this.currentStep + 1;
        },
        error => {
          console.log(error)
          this.snackBar.open('Registration failed.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      this.snackBar.open('Form is invalid.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  submitOTPForm(): void {
    if (this.otpForm.valid) {
      this.verifyOTPAndAuthenticate(this.otpForm.value.otp)
    } else {
      this.snackBar.open('OTP is incorrect. Please check your email and try again.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  sendOTP(): void {
    this.otp = this.generateOTP();
    // this.sendEmail(this.otp); uncomment this line to send email
    console.log(this.otp)
    this.isOTPSent = true;
  }

  getUserLocation(): void {
    const userId = this.localstorageService.getItem('userId');
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
    this.locationService.getUserCoords()
      .then((coords: any) => {
        this.locationService.getCityAndAddress(coords.latitude, coords.longitude).subscribe((location: any) => {
          const address: Address = {
            addressId: this.generateAddressId(),
            receiver: this.generateUsername(),
            type: this.generateRandomString(),
            location: location.address,
            city: location.city,
            phone: '6378443464'
          }
          this.saveUserAddress(userId, address)
        });
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  saveUserAddress(userId: string, address: Address): void {
    this.authService.saveAddress(userId, address).subscribe(savedAddress => {
      this.userService.setCurrentAddress(savedAddress);
      this.snackBar.open('Address saved successfully.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }, error => {
      this.snackBar.open('Failed to save address.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });
  }

  generateAddressId(): string {
    return 'addr-' + Math.floor(Math.random() * 1000000);
  }

  generateUsername(): string {
    return 'user-' + Math.floor(Math.random() * 1000000);
  }

  generateRandomString(): string {
    return 'current-' + Math.random().toString(36).substring(2, 15);
  }

  verifyOTPAndAuthenticate(otp: number) {
    if(this.otp == otp){
      const authRequest = { 
        username: this.signupForm.value.email,
        password: this.signupForm.value.password
      };
      this.authService.authenticate(authRequest).subscribe(
        authResponse => {
          this.snackBar.open('Sign up successfully.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.currentStep = this.currentStep + 1;
        },
        authError => {
          console.log(authError)
          this.snackBar.open('Authentication failed. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    }
    else {
      this.snackBar.open('OTP verification failed. Please try again.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
