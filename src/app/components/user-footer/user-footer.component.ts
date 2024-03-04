import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SessionService } from 'src/app/application/services/session.service';

@Component({
  selector: 'app-user-footer',
  standalone: true,
  imports: [FaIconComponent, NgIf],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.scss',
})
export class UserFooterComponent implements OnInit {
  user: User = null;
  exitIcon = faSignOutAlt;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.user = this.sessionService.user;
  }

  logout() {
    this.sessionService.logout();
  }
}
