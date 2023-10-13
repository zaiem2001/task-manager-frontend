import { Component, Input } from '@angular/core';

import { DUMMY_LISTS } from 'src/app/constants/constants';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div
      *ngFor="let listItem of listItems"
      [ngClass]="{
        'is-active': isActive,
        'list-item': true
      }"
    >
      <span>{{ listItem.title }}</span>
    </div>
  `,
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  listItems: List[] = DUMMY_LISTS;

  @Input('is-active') isActive: boolean = false;
}
