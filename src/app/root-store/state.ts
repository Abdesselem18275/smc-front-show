import { ProductStoreState } from './product-store';
import { ParamStoreState } from './param-store';
import {ModalStoreState } from './modal-store';
import {RouterStoreState } from './router-store';

export interface State {
    param: ParamStoreState.State;
    modal: ModalStoreState.State;
    product: ProductStoreState.State;
    router: RouterStoreState.State;
}
