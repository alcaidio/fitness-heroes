import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-stop-training',
    template: `
        <h1 mat-dialog-title>Are you sure?</h1>
        <mat-dialog-content>
            <p>You already got {{ displayedProgress }}%</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button [mat-dialog-close]="true">Yes</button>
            <button mat-button [mat-dialog-close]="false">No</button>
        </mat-dialog-actions>
    `,
})
export class StopTrainingComponent implements OnInit {
    displayedProgress: number
    constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {}
    
    ngOnInit() {
        this.displayedProgress = this.passedData.progress
    }
}

