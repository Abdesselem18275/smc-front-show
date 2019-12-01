import { ProductStoreState } from './product-store';
import { ParamStoreState } from './param-store';
import {ModalStoreState } from './modal-store';
export interface State {
    product: ProductStoreState.State;
    param: ParamStoreState.State;
    modal: ModalStoreState.State;
}
