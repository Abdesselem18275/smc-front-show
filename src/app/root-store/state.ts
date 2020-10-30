import { ProductStoreState } from './product-store';
import {ModalStoreState } from './modal-store';
import { GlobalStoreState } from './global-store';

export interface State {
    modal: ModalStoreState.State;
    product: ProductStoreState.State;
    global: GlobalStoreState.State;
}
