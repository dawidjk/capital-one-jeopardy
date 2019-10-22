import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  offset: number;
  category: string;
  value: any;
  min_date: Date;
  max_date: Date;
}

@Component({
  selector: "app-options-dialog",
  templateUrl: "./options-dialog.component.html",
  styleUrls: ["./options-dialog.component.scss"]
})
export class OptionsDialogComponent {
  pointValues = [null, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
