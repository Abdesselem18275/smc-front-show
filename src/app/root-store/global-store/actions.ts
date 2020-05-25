import { createAction, props } from "@ngrx/store";
import { UserLanguage } from "./state";


export const SetLanguageAction = createAction(
    '[Global] Set language',
    props<{ key: UserLanguage}>()
  );
 
export const LoadInitDataAction = createAction(
    '[Global] Load init data',
    props<{payload: any}>()
  );
   