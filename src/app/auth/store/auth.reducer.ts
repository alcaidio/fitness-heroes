import * as fromAuth from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean
}

const initialState: AuthState = {
    isAuthenticated: false
}

export function authReducer(state = initialState, action: fromAuth.AuthAction) {
    switch (action.type) {
        case fromAuth.SET_AUTHENTICATED:
            return { ...state, isAuthenticated: true }
        case fromAuth.SET_UNAUTHENTICATED:
            return { ...state, isAuthenticated: false }
        default:
            return state
    }
}

export const getIsAuth = (state: AuthState) => state.isAuthenticated