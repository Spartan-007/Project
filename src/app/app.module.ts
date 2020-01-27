import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SMSReader} from '../../plugins/cordova-sms-reader/src/android';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    SMSReader
    
  ],
  providers: [SMSReader],
  bootstrap: [AppComponent]
})
export class AppModule { }
