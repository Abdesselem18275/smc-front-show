import { Category } from 'src/app/models/product.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';


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
    private gss : GlobalStateService,
    private route: ActivatedRoute) {
    this.categories$ = this.gss.categories.pipe(map(categories => categories.filter(cat => cat.isRoot)))
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
