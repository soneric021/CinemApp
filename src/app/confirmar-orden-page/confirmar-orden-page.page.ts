import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../api/user.service';
import { Orden, Pedido, Ticket } from '../models/Interfaces';

@Component({
  selector: 'app-confirmar-orden-page',
  templateUrl: './confirmar-orden-page.page.html',
  styleUrls: ['./confirmar-orden-page.page.scss'],
})
export class ConfirmarOrdenPagePage implements OnInit {
  data:Orden[] = [];
  pedido:Orden[] = [];
  mySelect;
  mySelect2;
  cantidad:number;
  ticket:Ticket = null;
  total:number;
  paymentType:number;
  buttonmessage:string;
  isLogged:boolean = false;
  constructor(public navCtrl:NavController, private storage:Storage, private userService:UserService, private toastController:ToastController) { }

  ngOnInit() {
    this.storage.get("pedido").then(val => val == null ? this.data= [] : this.pedido = val);
    this.storage.get("tickets").then(val => {
      this.data = this.pedido.filter(x => x.bought ==false);
      if(val != null && val != undefined){
        this.ticket = val;
        this.cantidad = val.cantidad;
       if(val.bought == false){
        this.data.push(
          {
            pedido:val,
            cantidad:val.cantidad,
            bought:val.bought,
            paymentType: val.paymentType
          }
        )
       }
        this.total = this.data.map(x => x.pedido.price * x.cantidad).reduce((a,b) => a+b);
      }

    })
    this.userService.isLoggedIn().then(data => {
      console.log(data);
      if(data != null && data != undefined){
        this.isLogged = true;
      }
      this.buttonmessage = !this.isLogged? "Accede para confirmar tu orden" : "Realizar pago";
     });
    
 
  }

  async goToLogin(){
    if(!this.isLogged){
      this.navCtrl.navigateRoot('login');
    }else{
      if(this.cantidad == undefined){
        this.presentToast("Debes elegir la cantidad de tickets que quieres");
      }else if(this.paymentType == undefined){
        this.presentToast("Debes elegir un metodo de pago");
      }else{
        this.ticket.bought = true;
        this.pedido.map(x => x.bought = true);
        this.storage.set("tickets", this.ticket);
        this.storage.set('pedido', this.pedido);
        this.navCtrl.navigateRoot('tabs/tab2');
      }
    }
  }
  showSelectValue(mySelect){
    
    console.log(mySelect);
    this.cantidad = mySelect;
    if(this.ticket != null){
      this.data.pop();
    }
    this.ticket = {
      id:1,
      displayName: 'Avengers End-Game',
      name:'Tickets para Avengers End-Game',
      price:500,
      time:'4:00 P.M. - 7:00 P.M.',
      cantidad:this.cantidad, 
      bought:false
    }
    this.storage.set("tickets", this.ticket);
    
    
    this.data.push({
      pedido:this.ticket,
      cantidad:this.cantidad,
      bought:false,
      paymentType: this.paymentType
    })
    this.total = this.data.map(x => x.pedido.price * x.cantidad).reduce((a,b) => a+b);
   }
   showSelectValue2(mySelect2){
    console.log(mySelect2);
    this.paymentType = mySelect2;
   }
   
   async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
