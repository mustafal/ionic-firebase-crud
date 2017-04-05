import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  songs : FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public alertctrl:AlertController, public actionsheet : ActionSheetController, af:AngularFire) {
      this.songs = af.database.list('/Songs');
      
  }

  addSong(){
  let prompt = this.alertctrl.create({
    title: 'Song Name',
    message: "Enter a name for this new song you're so keen on adding",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
      },
      {
        name: 'artists',
        placeholder: 'Artists'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songs.push({
            artist:data.artists,
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

showOptions(songId, songTitle, songArtist) {
  let actionSheet = this.actionsheet.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Song',
        role: 'destructive',
        handler: () => {
          this.removeSong(songId);
        }
      },{
        text: 'Update title',
        handler: () => {
          this.updateSong(songId, songTitle, songArtist);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

removeSong(songId: string){
  this.songs.remove(songId);
}

updateSong(songId, songTitle, songArtist){
  let prompt = this.alertctrl.create({
    title: 'Song Name',
    message: "Update the name for this song",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: songTitle
      },
      {
        name: 'artist',
        placeholder: 'Artist',
        value: songArtist
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songs.update(songId, {
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

}
