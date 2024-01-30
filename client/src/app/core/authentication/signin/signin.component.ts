import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { AuthRequest } from 'src/app/shared/model/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/shared/model/user';
import { LocationService } from 'src/app/shared/service/location.service';
import { UserService } from 'src/app/shared/service/user.service';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  currentStep: number = 1;
  isOTPSent: boolean = false;
  otp: number;
  signinForm: FormGroup;
  otpForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private locationService: LocationService, private userService: UserService, private localstorageService: LocalstorageService) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });

    this.otp = 0; // Initialize otp here
  }

  submitSigninForm(): void {
    if (this.signinForm.valid) {
      const authRequest: AuthRequest = {
        username: this.signinForm.value.email,
        password: this.signinForm.value.password
      };

      this.authService.authenticate(authRequest).subscribe(
        response => {
          this.snackBar.open('Signin successful', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.currentStep = this.currentStep + 1;
        },
        error => {
          this.snackBar.open('Signin failed. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      this.snackBar.open('Form is invalid. Please check your inputs.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  submitOTPForm(): void {
    if (this.otpForm.valid) {
      if (this.otpForm.value.otp == this.otp) {
        this.snackBar.open('OTP is correct. You can now proceed to the next step.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.currentStep = 3;
      } else {
        this.snackBar.open('OTP is incorrect. Please check your email and try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    } else {
      this.snackBar.open('Form is invalid. Please check your inputs.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
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
      });
  }

  generateOTP(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  sendOTP(): void {
    this.otp = this.generateOTP();
    // this.sendEmail(this.otp); // Uncomment this line to send email
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
}
