import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { List } from 'src/app/models/list.model';
import { ListService } from 'src/app/services/List.service';

@Component({
  selector: 'app-list-item',
  template: `
    <div
      *ngFor="let listItem of listItems"
      [ngClass]="{
        'is-active': listItem._id === listId,
        'list-item': true
      }"
      (click)="onListClick(listItem._id)"
    >
      <span>{{ listItem.title }}</span>
    </div>
  `,
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  listId: undefined | null | string = null;
  listItems: List[] = [];

  constructor(
    private listService: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listService.getUsersList().subscribe((response) => {
      const { list } = response;
      this.listItems = list || [];
    });

    this.route.params.subscribe((params) => {
      const { listId } = params;
      this.listId = listId;
    });
  }

  onListClick(_id: string) {
    this.router.navigate([`/${_id}`]);
  }
}
