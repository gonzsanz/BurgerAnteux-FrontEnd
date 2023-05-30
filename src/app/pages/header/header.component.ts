import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSessionActive: boolean | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkSession().subscribe((res) => {
      this.isSessionActive = res;
    });
  }
}
