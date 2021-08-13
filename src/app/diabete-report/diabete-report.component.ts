import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-diabete-report',
  templateUrl: './diabete-report.component.html',
  styleUrls: ['./diabete-report.component.scss']
})
export class DiabeteReportComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  report: any;

  constructor(private route: ActivatedRoute,
              private reportService: ReportService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.reportService.generateReport(+id).pipe(takeUntil(this.destroy$)).subscribe(
      (report) => {
        this.report = report;
      }
    );
  }

}
