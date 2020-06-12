import { OnInit, Input, Component } from '@angular/core';
import { ProductComponent, ComponentsSpecification } from '../model';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss']
})
export class ProductComponentComponent{
  @Input() componentsSpecs : ComponentsSpecification[];
}
