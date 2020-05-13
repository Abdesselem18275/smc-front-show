import { Router } from '@angular/router';
import { RootStoreState, ParamStoreSelectors, ProductStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FavoriteHandlerService } from '../service/favorite-handler.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ProductShort, ParamType, Param } from 'src/app/product/model';


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
  isFavoriteRoute: Observable<boolean>;
  searchTerm: Observable<string>;
  constructor(private router: Router,
              private favHandler: FavoriteHandlerService,
              private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.isSearchActive = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).
    pipe(map( (params: Param[]) => params.length !== 0));
    this.searchTerm = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).
      pipe(map( (params: Param[]) => params.length < 1 ? '' : params.shift().value));
    this.isFavoriteRoute = this.store$.pipe(map(state => state.router.router.state.url.includes('account/profile')));
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
    //this.product.thumbNail?.content = '/src/assets/images/Pic_1.jpg';
  }
  removeFavorite(id) {
    this.store$.dispatch(ProductStoreActions.DeleteProduct({id: id}));
    this.favHandler.addRemoveFavorites(id);
  }


}
