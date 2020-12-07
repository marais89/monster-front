import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogType} from '../individu-create/individu-create.component';
import {ColorUtils} from '../utils/color-utils';

export interface DialogData {
  message: string;
  action: string;
}

export class DialogInformation {

  titre: string;
  message1: string;
  message2: string;
  dialogType: DialogType;
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

  findTextColorFromDialogType(type: DialogType): string {
    return ColorUtils.COLORFROMTYPE(type);
  }

  ok() {
    this.dialogInfo.onClickAction();
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
