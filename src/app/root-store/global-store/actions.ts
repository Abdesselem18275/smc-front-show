import { createAction, props } from "@ngrx/store";
import { LanguageType, UserLanguage } from "./state";


export const SetLanguageAction = createAction(
    '[Global] set language',
    props<{ key: UserLanguage}>()
  );
  