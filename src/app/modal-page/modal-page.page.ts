import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../api/user.service';
import { ConfirmarOrdenPagePage } from '../confirmar-orden-page/confirmar-orden-page.page';
import { bebidas, comidas, Orden, Pedido } from '../models/Interfaces';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})

export class ModalPagePage implements OnInit {
  pedido:Pedido = null;
  cantidad:number = null;

  @Input() modo:number;
  data = [];
  dataselected:Orden[] = [];
  datashowed:Orden[] = [];
  
 
  constructor(public navCtrl: NavController, private storage:Storage, private modalCtrl:ModalController, private toastController:ToastController, private firebaseDatabase:AngularFireDatabase) { }
  
  ngOnInit() {
    // this.storage.get("pedido").then(val => {
    //   if(val == null || val == undefined){
        
    //   } else{
    //     this.dataselected = val;
    //     console.log(this.dataselected);
      
    //     this.datashowed = this.dataselected.filter(x => x.bought == false);
    //     console.log(this.datashowed);
    //   }
    // });
    this.firebaseDatabase.database.ref('orden').on('value', val =>{
      if(!val.exists()){
        this.dataselected = [];
      }else{
        this.dataselected = val.val();
      
        this.datashowed = this.dataselected.filter(x => x.bought == false);
      }
    })
  
    if(this.modo == 1){
      this.data.push(...bebidas);
    }else{
      this.data.push(...comidas);
    }

  }
  agregarOrden(){
      if(this.cantidad != null && this.pedido != null){
        this.dataselected.push({
          pedido:this.pedido,
          cantidad: this.cantidad, 
          bought:false
        })
        //this.storage.set("pedido", this.dataselected);
        this.firebaseDatabase.database.ref('orden').set(this.dataselected);
        this.datashowed = this.dataselected.filter(x => x.bought == false);
        console.log(this.data);
        console.log(this.dataselected);
      }else{
        this.presentToast("Tienes un campo vacio");
      }
    
  }
  async confirmarOrden(){
    this.navCtrl.navigateRoot('confirmar-orden-page');
    this.dismiss()
  }
  showSelectValue(mySelect){
   this.pedido = mySelect;
  }
  deleteItem(value){
    this.datashowed = this.arrayRemove(this.datashowed, value);
    this.dataselected = this.arrayRemove(this.dataselected, value);
    this.firebaseDatabase.database.ref('orden').set(this.dataselected);
    //this.storage.set("pedido", this.dataselected);
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
