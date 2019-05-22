import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friendList: string[] = [];

  constructor() {
    for (let index = 0; index < 30; index++) {
      this.friendList.push('friend ' + index);
    }
  }

  ngOnInit() {
  }

}
