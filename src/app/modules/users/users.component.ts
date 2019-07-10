import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { fadeAnimation } from '../../core/animations/fade-animation';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeAnimation]
})
export class UsersComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
  }

}
