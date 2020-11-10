import { ProductStoreState } from './product-store';
import { GlobalStoreState } from './global-store';

export interface State {
    product: ProductStoreState.State;
    global: GlobalStoreState.State;
}
