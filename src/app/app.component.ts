import {AfterViewInit, Component} from '@angular/core';
import {MoexHttpService} from "./services/moex-http-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'DiplomMOEX';

  constructor(private httpService: MoexHttpService) {
  }

  ngAfterViewInit() {
    this.httpService.requesT();
  }
}
