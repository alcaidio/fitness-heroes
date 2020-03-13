import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAuth from './auth/store/auth.reducer'
import * as fromUi from './shared/ui.reducer'


export interface State {
    ui: fromUi.UiState,
    auth: fromAuth.AuthState,
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer,
}

export const getUiState = createFeatureSelector<fromUi.UiState>('ui')
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth')
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)


