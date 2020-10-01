import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-initials-icon',
  templateUrl: './initials-icon.component.html',
  styleUrls: ['./initials-icon.component.scss']
})
export class InitialsIconComponent implements OnInit {
  @Input() initials? : string;
  @Input() size : number = 48
  constructor() { }

  ngOnInit(): void {
  }

}
