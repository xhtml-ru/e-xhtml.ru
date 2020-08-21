import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'e-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss']
})
export class CookieNoticeComponent implements OnInit {

  accepted = false;

  constructor(
    private cookieService: CookieService,
  ) { }

  acceptMe() {
    this.accepted = true;
    this.cookieService.set('cookie_notice_accepted', 'true', 30);
    return false;
  }

  ngOnInit(): void {
    const c = this.cookieService.get('cookie_notice_accepted');
    this.accepted = c ? true : false;
  }
}
