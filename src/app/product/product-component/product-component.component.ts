import { Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentsSpecification } from 'src/app/core/types';

@Component({
  selector: 'app-product-component',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss']
})
export class ProductComponentComponent{
  @Input() componentsSpecs: ComponentsSpecification[] = [];
}
