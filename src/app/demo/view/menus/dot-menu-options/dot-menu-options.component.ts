import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-dot-menu-options',
  standalone: false
})
export class DotMenuOptionsComponent {
  @Input() ItemId: MenuItem[];
  @Input() boxWidth: string;

  constructor() { }
}
