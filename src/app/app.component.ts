import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 500;
  }

  scrollToTop() {
    window.scrollTo(0,0);
  }

}
