import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile/profile.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AlertService} from '../../../services/alert/alert.service';
import {Observable} from 'rxjs';
import {UserProfile} from './models/UserProfile';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profilePic: Observable<string>;
  profilePicList: Observable<string[]>;
  @Input() userProfile: UserProfile;

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private profileService: ProfileService, private alertService: AlertService) {

  }

  ngOnInit() {
    this.profileService.retrieveProfileDetails().subscribe(data => {
      this.userProfile = data;
    });

    this.profileService.getProfilePicture().subscribe(
      (data => {
        console.log('[picture] : ', data);
        this.profilePic = data.picture;
      }));
  }


  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.profileService.uploadProfilePicture(this.currentFileUpload).subscribe(data => {
      console.log('Received data', [data]);
    });

    this.selectedFiles = undefined;
  }
}
