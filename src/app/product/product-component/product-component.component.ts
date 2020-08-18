import { Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentsSpecification } from '../../models/product.models';

@Component({
  selector: 'app-product-component',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './product-component.component.html',
})
export class ProductComponentComponent{
  @Input() componentsSpecs : ComponentsSpecification[];
}
