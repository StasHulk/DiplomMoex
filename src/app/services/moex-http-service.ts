import {HttpClient} from "@angular/common/http";
import {RxStomp} from "@stomp/rx-stomp";
import {Injectable} from "@angular/core";
import {Client, Stomp} from "@stomp/stompjs";
import {Observable, Observer} from "rxjs";
import {webSocket} from "rxjs/webSocket";
// import SockJS from 'sockjs-client';
declare var SockJS: any;

@Injectable({
  providedIn: 'root',
})
export class MoexHttpService {

  constructor(public http: HttpClient){

  }

  // createWS(){
  //   const subject = webSocket('wss://10.20.33.253:9002/live-stocks');
  //
  //   subject.subscribe(
  //     msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
  //     err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
  //     () => console.log('complete') // Called when connection is closed (for whatever reason).
  //   );
  // }

  requesT(){
    const body = {
      "page": {
        "pageSize": 0,
        "pageIndex": 0
      }
    }

    this.http.post('/iss/engines', body).subscribe((res) => {
      console.log(res);
    })
  }


  webSocketConnect2(){

      /* Configuring WebSocket on Client Side */
      var socket = new SockJS('http://10.20.33.253:9002/live-stocks');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function(frame: any) {
        stompClient.subscribe('ws://10.20.33.253:9002/app/topic', function(data) {
          console.log('DATA ', data)
        });
      });
  }

  webSocketConnect(){
    // const rxStomp = new RxStomp();
    // rxStomp.configure({
    //   brokerURL: '10.20.33.253:9002/live-stocks',
    //   reconnectDelay: 200,
    //   debug: (msg: string): void => {
    //     console.log(new Date(), msg);
    //   }
    // });
    // rxStomp.activate();

    const stompClient = Stomp.over(() => {
      return new SockJS('http://10.20.33.253:9002/live-stocks');
    });

    stompClient.connect({}, (frame: any) => {
      stompClient.subscribe('http://10.20.33.253:9002/app/topic', (data) => {
        console.log('SUBSCRIBE', data);
      })
    });

    // const stompClient = new Client({
    //   brokerURL: '/app/topic',
    //   debug: function (str) {
    //     console.log(str);
    //   },
    //   reconnectDelay: 5000,
    //   heartbeatIncoming: 4000,
    //   heartbeatOutgoing: 4000,
    // });
    //
    // stompClient.webSocketFactory = () => {
    //     return new SockJS('/live-stocks');
    //   };
    //
    // stompClient.onConnect = function (frame) {
    //   console.log('CONNECTED ', frame);
    // };
    //
    // stompClient.onStompError = function (frame) {
    //   console.log('Broker reported error: ' + frame.headers['message']);
    //   console.log('Additional details: ' + frame.body);
    // }
    //
    // stompClient.co
    //
    // stompClient.activate();

    // stompClient.connect({}, function (frame: any) {
    //   console.log('Connected: ' + frame);
    //   stompClient.subscribe('/app/topic', function (greeting) {
    //     console.log('GREETING ', greeting);
    //   });
    // });

    // sockJS.onopen = function() {
    //   console.log('open');
    //   sockJS.send('test');
    // };
    //
    // sockJS.onmessage = function(e: any) {
    //   console.log('message', e.data);
    //   sockJS.close();
    // };
    //
    // sockJS.onclose = function() {
    //   console.log('close');
    // };






  }

}
