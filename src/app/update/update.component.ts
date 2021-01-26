import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  text = "Ese correo ya está asociado a otro usuario";
  text2= "Datos actualizados exitosamente";
  userID=localStorage.getItem('myId');
  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
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
  });
  user = {
    names: '',
    nicknames:'',
    email: '',
    phone: ''
  };
  constructor(private usuarioService:UsuarioService,
              private router:Router,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario(this.userID)
      .subscribe(
        res=>{
          this.user.names=res['usuario'][0]['names'];

          this.user.email=res['usuario'][0]['email'];
          this.user.phone=res['usuario'][0]['phone'];
          this.user.nicknames=res['usuario'][0]['nicknames'];
        },

        err=>console.log("error al recibir empleado",this.userID) //err
      )
  }
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

  get phone(){
    return this.validatorGroup.get('phone')
  }

  onSubmit() {
    this.usuarioService.update(this.user, this.userID)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
          // guarde token en el local storage
          localStorage.setItem('token', res.token);
          this.openDialog(this.text2);
          this.router.navigate(['/update'])


        },
        err => this.openDialog(this.text) //err

    )
  }
  openDialog(text1) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';

    dialogConfig.data = {
      msg: text1,
    };
    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
    },
    (e) => {
        console.error(e);
    });
    }

}
