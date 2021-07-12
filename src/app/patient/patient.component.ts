import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  @Input() id: number = 0;
  @Input() given: string = '';
  @Input() family: string = '';
  @Input() dob: string = '';
  @Input() sex: string = '';
  @Input() address: string = '';
  @Input() phone: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
