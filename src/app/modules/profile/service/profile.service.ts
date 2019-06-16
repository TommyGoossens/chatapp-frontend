import {Injectable} from '@angular/core';
import {RestService} from '../../../core/services/rest.service';
import {Observable} from 'rxjs';
import {EditProfileDTO} from '../models/dialog-edit-details/EditProfileDTO';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import {AuthService} from '../../../core/authentication/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private storage;
  private storageRef;

  constructor(private restService: RestService, private af: AngularFirestore) {
    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
  }

  uploadProfilePicture(image: File): string {
    const profilePic = this.setFileName(image);
    const fileRef = this.storageRef.child('profile_pictures/' + profilePic.name);

    fileRef.put(profilePic).then(snapshot => {
      fileRef.getDownloadURL().then(URL => {
        this.restService.post('user/profile/picture', URL).subscribe();
        return URL;
      });
    });
    return 'https://firebasestorage.googleapis.com/v0/b/chatapp-68f21.appspot.com/o/profile_pictures%2Fnot_yet_set.png?alt=media&token=0ee8fca4-196d-4fc7-bbea-f0e366a21a39';
  }

  retrieveProfileDetails() {
    return this.restService.get(`user/profile/${AuthService.getAuthenticatedUser()}`);
  }

  updateProfile(newUserDetails: EditProfileDTO): Observable<any> {
    return this.restService.put('/user/profile', newUserDetails);
  }

  /**
   * Adds a new friend connection
   * @param email of the friend
   */
  public addFriend(email: string): Observable<any> {
    const data = {
      email
    };
    return this.restService.put('user/profile/addfriend', data);
  }

  /**
   * Removes a friend connection
   * @param email of the friend
   */
  public removeFriend(email: string): Observable<any> {
    const data = {
      email
    };
    return this.restService.put('user/profile/removefriend', data);
  }


  setFileName(image: File): File {
    const dotIndex = image.name.lastIndexOf('.');
    const extension = image.name.substring(dotIndex, image.name.length);
    Object.defineProperty(image, 'name', {
      writable: true,
      value: AuthService.getAuthenticatedUser() + extension
    });
    console.log('[Name] : ', image.name);

    return image;
  }
}
