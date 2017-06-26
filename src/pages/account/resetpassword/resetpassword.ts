import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewController, Events } from 'ionic-angular';
import { CustomService } from '../../../service/custom.service';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'reset-password-modal',
    templateUrl: 'resetpassword.html'
})

export class resetPasswordModal implements OnInit {
    resetPasswordForm: FormGroup;
    mismatch: boolean = false;
    title = "UPDATE PASSWORD";
    ngOnInit() {
        this.buildForm();
    }


    constructor(private viewCtrl: ViewController,
                private formBuilder: FormBuilder,
                public nl: CustomService,
                public appService: AuthService,
                public events: Events
               ) { }


    public buildForm() {
        this.resetPasswordForm = new FormGroup({
            oldPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
            confirmPassword: new FormControl('', [Validators.required, Validators.minLength(2)])
        }, passwordMatchValidator);

        function passwordMatchValidator(g: FormGroup) {
            return g.get('newPassword').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
        }
    }

    public dismiss() {
        this.viewCtrl.dismiss();
    }

    public resetPassword() {
    let data = this.resetPasswordForm.value;
    if (!this.resetPasswordForm.valid) {
      this.checkValidation(data);
    } else {
        console.log("DSDs", data)
        this.nl.showLoader();
        this.appService.resetPassword(data).subscribe((res) => {
          this.onSuccess();
        }, (err) => {
        this.onError(err);
      });
    }
  }

  public onSuccess() {
    this.nl.hideLoader();
    this.dismiss();
    this.nl.showToast("Password reset successfully.");
  }

  public onError(err) {
    this.nl.hideLoader();
    this.dismiss();
    if (err === 403) {
      this.nl.showToast("You have entered wrong old password");
    } else if(err == 401 || err === 0) {
      this.events.publish("session:expired");
    } else {
      this.nl.errMessage();
    }
  }



  public checkValidation(value) {
    if (!value.oldPassword) {
      this.nl.showToast("please enter old password.");
    } else if (!value.newPassword) {
      this.nl.showToast("please enter new password.");
    } else if (!value.confirmPassword) {
      this.nl.showToast("please enter confirm password.");
    } else if (value.newPassword && value.confirmPassword) {
      this.nl.showToast("New password and confirm password not matched.");
    }
  }
}

