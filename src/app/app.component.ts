import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  chat: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    let query = ref => ref.orderBy('timestamp','asc')
    this.chat = firestore.collection('chat',query).valueChanges();
  }
  title = 'firestore-chat';
  newMessage = {};
  messageText = ''

  sendMessage() {
    //newMessage.timestamp = new Date()
    //message.user = getCurrentUser()
    this.firestore.collection('chat').add({
      text:this.messageText,
      timestamp : new Date()
    });
    this.messageText=''
  }
}



export class Message {
  constructor(
    public timestamp: Date,
    public text: string,
    //public user: string,
  ) { }
}