import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AddUserPage } from '../pages/add-user/add-user';


export const firebaseConfig = {
   apiKey: "AIzaSyDzWiWJCGhbfX5IPFgyEH9GgpsLVgLnvwM",
    authDomain: "my-ionic-project-93b1a.firebaseapp.com",
    databaseURL: "https://my-ionic-project-93b1a.firebaseio.com",
    projectId: "my-ionic-project-93b1a",
    storageBucket: "my-ionic-project-93b1a.appspot.com",
    messagingSenderId: "1010402229824"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddUserPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

