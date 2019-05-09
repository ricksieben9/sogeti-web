import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: any;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups();
  }

  //get all groups
  getGroups(){
    const groupObservable = this.groupService.getAllGroups();
    groupObservable.subscribe((userData: any[]) => {
      this.groups = userData;
    })
  }

}
