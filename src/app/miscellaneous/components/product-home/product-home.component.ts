import { Category } from 'src/app/models/product.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent  implements AfterViewInit  {
  @ViewChild('contactUs')
  private contactUsEl: ElementRef<HTMLElement>;

  @ViewChild('aboutUs')
  private aboutUsEl: ElementRef<HTMLElement>;
  categories$: Observable<Category[]>;
  isLoaded$ = new BehaviorSubject<boolean>(false);
  bgClass= {};


  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>) {
    this.categories$ = this.store$.select(GlobalStoreSelectors.selectRootCategories);
    this.isLoaded$.subscribe((x) => {
      this.bgClass = {
        'hero-image':  x,
        'image--pulsing': !x
      };
    });

   }


   ngAfterViewInit() {

    this.route.fragment.pipe(
      filter(fragment => fragment !== null),
      take(1)
    ).subscribe(e => {
      switch(e) {
        case 'about-us': {
          this.scroll(this.aboutUsEl.nativeElement);

          break;
        }
        case 'contact-us': {
          this.scroll(this.contactUsEl.nativeElement);
          break;
        }
        default: {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    });
   }
  isLoaded() {
    this.isLoaded$.next(true);
  }
  scroll(el: HTMLElement) {
    setTimeout(() => {
      el.scrollIntoView({
        behavior:'smooth'
      });
    });

  }

}
