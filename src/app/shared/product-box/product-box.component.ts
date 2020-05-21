import { Router } from '@angular/router';
import { RootStoreState, ParamStoreSelectors, ProductStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ProductShort, ParamType, Param } from 'src/app/product/model';
import { UserStoreActions } from 'src/app/root-store/user-store';
import { RouterStoreSelectors } from 'src/app/root-store/router-store';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit, OnChanges  {

  @Input() product: ProductShort;
  isLoading: boolean;
  isFetching: boolean;
  isSearchActive: Observable<boolean>;
  isFavoriteRoute: Observable<any>;
  searchTerm: Observable<string>;
  constructor(private router: Router,
              private store$: Store<any>) { }

  ngOnInit() {
    this.isSearchActive = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).
    pipe(map( (params: Param[]) => params.length !== 0));
    this.searchTerm = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).
      pipe(map( (params: Param[]) => params.length < 1 ? '' : params.shift().value));
    this.isFavoriteRoute  = this.store$.select(RouterStoreSelectors.isCrrentUrl,{url:'favorites'});
    this.store$.select(RouterStoreSelectors.selectUrl).subscribe(x => {
      console.warn(x)
    })
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
    // this.isFetching = true;
    // this.router.navigate([{
    //   outlets: {
    //     primary : ['product', id],
    //     popup: null }}]);
  }

  ImageMockup() {
    //this.product.thumbNail?.content = '/src/assets/images/Pic_1.jpg';
  }
  removeFavorite(id) {
    this.store$.dispatch(ProductStoreActions.DeleteProduct({id}));
    this.store$.dispatch(UserStoreActions.ToggleFavoriteAction({id}));
  }


}
