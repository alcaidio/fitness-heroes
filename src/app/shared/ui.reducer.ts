import * as fromUi from './ui.actions';

export interface UiState {
    isLoading: boolean
}

const initialState: UiState = {
    isLoading: false
}

export function uiReducer(state = initialState, action: fromUi.UIAction) {
    switch (action.type) {
        case fromUi.START_LOADING:
            return { ...state, isLoading: true }
        case fromUi.STOP_LOADING:
            return { ...state, isLoading: false }
        default:
            return state
    }
}

export const getIsLoading = (state: UiState) => state.isLoading