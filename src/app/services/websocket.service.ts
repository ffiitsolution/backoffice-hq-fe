import { Injectable } from '@angular/core';
import { Client, Stomp, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private functions: { [key: string]: () => void } = {};
  protected config = AppConfig.settings.apiServer;
  private stompClient: Client;
  private initializedPromise: Promise<void> | undefined;
  connectedCount: number = 1;

  constructor() { }

  isWebSocketConnected(): boolean {
    return !!this.stompClient && this.stompClient.connected;
  }

  initializeWebSocketConnection(): Promise<void> {
    if (this.initializedPromise) {
      return this.initializedPromise;
    }

    const urlWs = this.config.BASE_URL + '/ws';

    // this.stompClient = Stomp.over(function(){
    //   return new SockJS(urlWs);
    // });


    this.stompClient = new Client({
      brokerURL: urlWs.replace('http', 'ws').replace('https', 'wss'),
    });

    this.initializedPromise = new Promise<void>((resolve, reject) => {
      this.stompClient.onConnect = (frame: any) => {
        this.stompClient.reconnectDelay = 5000;
        console.log('Connected to WebSocket x' + this.connectedCount++);
        if (this.connectedCount > 1) {
          this.executeFunction('WS_SUBSCRIBE_HEADER');
        }
        resolve();
      };
      this.stompClient.onDisconnect = (state) => {
        console.log('Disconnected to WebSocket');
      };
      this.stompClient.onStompError = (error: any) => {
        console.error('WebSocket error: ' + error);
        reject(error);
      };
    });
    this.stompClient.activate();

    window.addEventListener('beforeunload', () => {
      this.stompClient.deactivate();
    });

    return this.initializedPromise;
  }

  subscribe(destination: string, callback: (message: string) => void): StompSubscription | undefined {
    if (!this.isWebSocketConnected()) {
      console.error('WebSocket is not connected.');
      return undefined;
    }
    if (this.stompClient) {
      return this.stompClient.subscribe(destination, (message: any) => {
        callback(message.body);
      });
    } else {
      console.error('Stomp client is not initialized.');
      return undefined;
    }
  }

  unsubscribe(destination: string): void {
    if (!this.isWebSocketConnected()) {
      console.error('WebSocket is not connected.');
      return;
    }
    if (this.stompClient) {
      this.stompClient.unsubscribe(destination);
    } else {
      console.error('Stomp client is not initialized.');
    }
  }

  sendMessage(destination: string, message: string): void {
    if (!this.isWebSocketConnected()) {
      console.error('WebSocket is not connected.');
      return;
    }
    console.log('sendMessage to ' + destination + ' | Content: ' + message);
    if (this.stompClient) {
      this.stompClient.publish({ destination: destination, body: message });
    } else {
      console.error('Stomp client is not initialized.');
    }
  }

  registerFunction(key: string, func: () => void): void {
    this.functions[key] = func;
  }

  executeFunction(key: string): void {
    const func = this.functions[key];
    if (func) {
      func();
    } else {
      console.error(`No function registered with key: ${key}`);
    }
  }
}
