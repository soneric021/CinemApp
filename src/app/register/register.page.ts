import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../api/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name:string;
  password:string;
  email:string;

  constructor(public navCtrl:NavController, private userService:UserService) { }

  ngOnInit() {
  }
  register(){
    this.userService.registrarUsuario(this.name, this.email, this.password);
  }

  async goToLogin(){
 
      this.navCtrl.navigateRoot('login');
   
  }
}
