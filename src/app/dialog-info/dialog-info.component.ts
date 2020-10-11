import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  message: string;
  action: string;
}

export class DialogInformation {

  titre: string;
  message1: string;
  message2: string;
  noLbl: string;
  okLbl: string;
  onClickAction: () => void;
}

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.css']
})
export class DialogInfoComponent implements OnInit {

  @Input() dialogInfo: DialogInformation;

  constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ok(){
    this.dialogInfo.onClickAction();
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
