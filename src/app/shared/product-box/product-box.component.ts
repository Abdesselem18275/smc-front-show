import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductShort, Param, ParamType } from 'src/app/product/model';
import { Router } from '@angular/router';
import { RootStoreState, ParamStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit, OnChanges  {

  @Input() product: ProductShort;
  @Input() mode: string;
  isLoading: boolean;
  isFetching: boolean;
  isSearchActive: Observable<boolean>;
  searchTerm: Observable<string>;
  constructor(private router: Router,
              private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.isSearchActive = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).
    pipe(
      map( (params: Param[]) => params.length !== 0));
    this.searchTerm = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).
      pipe(
        map( (params: Param[]) => params.shift().value));
    this.isLoading = true;
    this.isFetching = false;
    this.ImageMockup();

  }

  ngOnChanges(changes: SimpleChanges)  {
    this.ImageMockup();
    this.isLoading  = true;

  }


  onImageLoad(evt) {
    this.isLoading  = false;

  }

  navigateTo(id: number) {
    this.isFetching = true;
    this.router.navigate([{
      outlets: {
        primary : ['product', id],
        popup: null }}]);
  }

  ImageMockup() {
    //this.product.thumbNail.content = '/src/assets/images/Pic_1.jpg';
  }


}
