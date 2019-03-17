import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { encode } from 'punycode';
import { ProductDataService } from '../service/product-data.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {



  constructor(private pds: ProductDataService) { }

  ngOnInit() {
    }

}
