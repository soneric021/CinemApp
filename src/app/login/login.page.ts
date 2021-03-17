import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  constructor(public navCtrl:NavController, private userService:UserService, public toastController: ToastController) { }

  ngOnInit() {
  }
  login(){
      this.userService.login(this.email, this.password).then(data =>  
        this.navCtrl.navigateRoot('confirmar-orden-page')
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
