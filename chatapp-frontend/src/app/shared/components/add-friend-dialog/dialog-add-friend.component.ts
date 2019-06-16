import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {RestService} from '../../../core/services/rest.service';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-dialog-add-friend',
  templateUrl: './dialog-add-friend.component.html',
  styleUrls: ['./dialog-add-friend.component.scss']
})
export class DialogAddFriendComponent implements OnInit {
  friendIsAvailable: Observable<boolean>;
  searchTerms = new Subject<string>();
  message: any;

  constructor(public dialogRef: MatDialogRef<DialogAddFriendComponent>, private restService: RestService) {
  }

  checkFriendMail(term: string): void {
    console.log('input', term);
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),


      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.restService.searchEmail(term).pipe(tap(data => {
        this.friendIsAvailable = data.available;
        this.message = data.content;
      })))).subscribe();
  }

  onSave(email: string) {
    this.dialogRef.close(email);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
