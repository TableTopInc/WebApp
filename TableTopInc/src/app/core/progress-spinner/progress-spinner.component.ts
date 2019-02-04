import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
})
export class ProgressSpinnerComponent implements OnInit {

  loadingText: string;

constructor() {
  this.loadingText = 'Please wait! Data loading...';
  }

  ngOnInit() {
}

}
