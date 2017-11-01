import { ActionSheetController, AlertController, NavController } from 'ionic-angular';
import { AddUserPage } from '../add-user/add-user';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  songs: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public alertctrl: AlertController, public actionsheet: ActionSheetController, af: AngularFire) {
    this.songs = af.database.list('/Songs');

  }

  addSong() {

    this.navCtrl.push(AddUserPage);

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
        }, {
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle, songArtist);
          }
        }, {
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

  removeSong(songId: string) {
    let confirm = this.alertctrl.create({
      title: 'Are You sure?',
      message: 'Do you agree to Delete this song?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          
          }
        },
        {
          text: 'Yes',
          handler: () => {
          this.songs.remove(songId);
          }
        }
      ]
    });
    confirm.present();
    
  }

  updateSong(songId, songTitle, songArtist) {
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
