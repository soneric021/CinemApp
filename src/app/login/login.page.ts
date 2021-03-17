import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../api/user.service';
import { User } from '../models/Interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  user:User;
  constructor(public navCtrl:NavController, private userService:UserService, public toastController: ToastController, private storage:Storage) { }

  ngOnInit() {
  }
  login(){
      this.userService.login(this.email, this.password).then(data =>  
          {
            console.log(data.user.email);
            this.user = {
              email: data.user.email,
              name: data.user.displayName,
              password: ''
            }
   
            this.storage.set('user', this.user);
            this.navCtrl.navigateRoot('confirmar-orden-page')
          }
      )
      .catch(error => this.presentToast("Credenciales incorrectas"));;
     
  }
  async register(){
    this.navCtrl.navigateRoot('register');
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  

}
