import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Network } from 'ionic-native';

@Injectable()
export class NetworkService {

  constructor(private events: Events) { }

  checkNetworkStatus() {
    Network.onDisconnect().subscribe(() => {
      this.events.publish("offline");
    });
    Network.onConnect().subscribe(() => {
      this.events.publish("online");
    });
  }

}
