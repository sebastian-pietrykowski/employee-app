import { Component } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(public readonly messageService: MessageService) {}
}
