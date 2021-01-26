import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  text = 'El usuario ya existe. Revise cédula o correo.'
  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    phone: new FormControl('',[
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),
    names: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')
    ]),
    nicknames: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
  });
  user = {
    id_user: '',
    names: '',
    nicknames:'',
    email: '',
    password: '',
    phone: ''
  };
  constructor(
    private authService: AuthService,
    private router:Router,
    private readonly dialog: MatDialog) { }

  ngOnInit() {}
  get primEmail() {
    return this.validatorGroup.get('email');
  }
  get justNumber() {
    return this.validatorGroup.get('number');
  }

  get names() {
    return this.validatorGroup.get('names');
  }
  get nicknames() {
    return this.validatorGroup.get('nicknames');
  }

  get password(){
    return this.validatorGroup.get('password');
  }

  get phone(){
    return this.validatorGroup.get('phone')
  }

  onSubmit() {
    this.authService.signUp(this.user)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
          // guarde token en el local storage
          //localStorage.setItem('token', res.token);
          this.openDialog("", "Registro exitoso, disfruta de nuestros servicios");
          console.log("aca va el mensaje");
          this.router.navigate(['/signin']);
        },
        err => this.openDialog("ERROR","El usuario ya existe. Revise cédula o correo.") //err
    )
  }
  openDialog(title, text) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';

    dialogConfig.data = {
      title: title,
      msg: text,
    };
    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
    },
    (e) => {
        console.error(e);
    });
    }



}
