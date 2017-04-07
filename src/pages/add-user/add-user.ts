import { OnInit,Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


/*
  Generated class for the AddUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html'
})
export class AddUserPage implements OnInit{

  songs : FirebaseListObservable<any>;
  myForm: FormGroup;
  addUser: { title: string, artist: string } = { title: '', artist: '' };

   addSong1(){
      this.songs.push({
        title:this.addUser.title,
        artist:this.addUser.artist
      });

      this.navCtrl.pop();
      
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,af:AngularFire) { 
    this.songs= af.database.list('/Songs');
  }

  ngOnInit(): any {
    this.myForm = this.formBuilder.group({
      'title': ['', [Validators.required, Validators.minLength(3), this.titleValidator.bind(this)]],
      'artist': ['', [Validators.required, Validators.minLength(3), this.artistValidator.bind(this)]]
    });
  }

  onsubmit(){
    console.log("Submitting Form");
  }

  isValid(field:string){
    let formField = this.myForm.get(field);
    return formField.valid || formField.pristine;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  titleValidator(control: FormControl): {[s:string]:boolean}{
    if(!control.value.match("^[a-zA-Z ,.'-]+$")){
      return {invalidTitle : true};
    }
  }

  artistValidator(control: FormControl): {[s:string]:boolean}{
    if(!control.value.match("^[a-zA-Z ,.'-]+$")){
      return {invalidArtist : true};
    }
  }

 
}
