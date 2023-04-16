import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../control-panel/message-box/message-box.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.dialog.open(MessageBoxComponent)
  }

}
