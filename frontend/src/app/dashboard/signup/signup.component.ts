import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, ValidatorFn, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/model/customer.model';
import { SignupService } from 'src/app/service/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyValuePipe } from '@angular/common';
import { __values } from 'tslib';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private signupService: SignupService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  customer = this.fb.group({
    customerName: ['', Validators.required],
    customerPhone: ['', [
          Validators.required,
          Validators.pattern('(9|8|7)[0-9]{9}'),
        ]],
    email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ])],
    password: ['', Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\W]{8,63}$'
          ),
        ])],
    cnfPassword:['', Validators.required]
  }, { validator: verifypwd('password', 'cnfPassword') })
  
  saveCustomer(data: FormGroup){
    let customerData: Customer = {
      customerName: data.get('customerName')?.value,
      customerPhone: data.get('customerPhone')?.value,
      email: data.get('email')?.value,
      password: data.get('password')?.value,
    }
    this.signupService.post(customerData).subscribe(() => {
      this._snackBar.open('Congrats, you have submitted the form!!', 'success', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary'],});
    })
  }
}


// Verfiy confirm Password
export function verifypwd(pass: string, cnfPass: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(pass)?.value;
    const cnfPassword = control.get(cnfPass)?.value;
    if (password != cnfPassword) {
      const err = { 'noMatch': true };
      control.get(cnfPass)?.setErrors(err);
      return err;
    } 
    return null;
  }
}
