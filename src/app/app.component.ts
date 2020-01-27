import { Component, OnInit } from '@angular/core';
import {SMSReader} from '../../plugins/cordova-sms-reader/src/android';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
 
  title = 'andDemo';

   public reader:  any[]=[]; 
  
  constructor(private smsreader : SMSReader)
  {

  }
    
  readSMS(){
  this.smsreader.getAllSMS('2020-01-25')
  .then((sms)=>{
      
  },
  (err)=>{
      console.error(err);
  });
}
}
    // LoadSMS()
    // {
    //   let options = {
    //     filter:'',
    //     multiple:true,
    //     hasPhoneNumber:true
    //   };

    //   this.smsreader.find['*'].then((smsRead: SMSReader[]) =>{
    //     this.smsreader=smsRead;
    //     console.log('Contacts: ',smsRead);
    //   });
    // }

   

  // smsreader.getAllSMS('2020-01-25')
  //   .then((sms)=>{
  //       // Fetches all SMS received after 2019-01-01
  //   },
  //   (err)=>{
  //       console.error(err);
  //   });

    

