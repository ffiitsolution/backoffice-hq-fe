import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-nodata',
  templateUrl: './table-nodata.component.html',
  styleUrls: ['./table-nodata.component.scss']
})
export class TableNodataComponent {
  @Input() colspan = 3;
}
