import { Component, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {

  recordName = new FormControl('');
  constructor(public dialogRef: MatDialogRef<MessageBoxComponent>)
  {
  }

  closeBox()
  {
    
  }
}