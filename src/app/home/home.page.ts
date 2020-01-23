import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Contacts, Contact, ContactName, ContactField } from '@ionic-native/contacts/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ToastController } from '@ionic/angular';
import { NavController } from 'ionic-angular';
import { constants } from 'os';
 declare var SMSReceive:any;
 declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public smses:any;
  OTP:string='';
  showOTPInput:boolean=false;
  OTPmessage:string='an OTP is sent to your mobile number. You should receive it in 15 seconds';

  
  myContacts: Contact[]=[];
  constructor(public navCtrl: NavController,private contacts: Contacts, private callNumber: CallNumber, private sms: SMS,private toastCtrl: ToastController) {}

  loadContacts(){
    let options = {
      filter:'',
      multiple:true,
      hasPhoneNumber:true
    };

    this.contacts.find(['*'], options).then((contacts: Contact[]) =>{
      this.myContacts=contacts;
      console.log('Contacts: ',contacts);
    });
  }

  getSMS(){
    if(window.SMS) window.SMS.listSMS({},data=>{
        setTimeout(()=>{
            console.log(data);
            this.smses=data;
        },0)
 
    },error=>{
      console.log(error);
    });
  }

  sendSms(contact: Contact)
  {
    this.sms.send(contact.phoneNumbers[0].value, 'OTP:25864!');
    
  }

  call(contact: Contact)
  {
    this.callNumber.callNumber(contact.phoneNumbers[0].value,true);
  }

  createContact()
  {
    let contact: Contact=this.contacts.create();

    contact.name= new ContactName(null,'Albus','Ape');
    contact.phoneNumbers=[new ContactField('mobile','8855867643')];
    contact.save().then(
      async () => {
        let toast =await this.toastCtrl.create({
          message:'Contact Added!'
        });
        toast.present();
      },
      (error: any) => console.error('Erroe saving contact.',error)
    );
  }
  async presentToast(message,show_button,position,duration)
  {
    const toast=await this.toastCtrl.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

  next()
  {
    this.showOTPInput=true;
    this.start();
  }

  start()
  {
    SMSReceive.startWatch(
      () => {
        document.addEventListener('onSMSArrive',(e:any) => {
          var IncomingSMS=e.data;
          this.processSMS(IncomingSMS);
        });
      },
      () => {console.log('watch start failed')}
    )
  }

  stop(){
    SMSReceive.stopWatch(
      () => { console.log('watch stopped')},
      () => { console.log('watch stop failed')}
    )
  }

  processSMS(data){
    const message =data.body;
    if(message && message.indexOf('enappd_starters')!=-1){
      this.OTP=data.body.slice(0,6);
      this.OTPmessage ='OTP received. Proceed to register'
      this.stop();
    }
  }

  register(){
    if(this.OTP !=''){
      this.presentToast('successfully registerd',false,'top',1500);
    }
    else{
      this.presentToast('otp is invalid',false,'bottom',1500);
    }
  }
}
