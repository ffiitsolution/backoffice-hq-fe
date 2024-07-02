import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements OnInit {
    @Input() id: any;
    @Input() isProcessing: boolean = false;

    ngOnInit(): void {
        
    }

}
