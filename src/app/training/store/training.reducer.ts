import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Exercise } from './../exercise.model';
import * as fromTraining from './training.actions';

export interface TrainingState {
    availableExercises: Exercise[],
    finishedExercises: Exercise[],
    activeTraining: Exercise
}

export interface State extends fromRoot.State {
    training: TrainingState
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
}

export function trainingReducer(state = initialState, action: fromTraining.TrainingAction) {
    switch (action.type) {
        case fromTraining.SET_AVAILABLE_TRAININGS:
            return { ...state, availableExercises: action.payload }
        case fromTraining.SET_FINISHED_TRAININGS:
            return { ...state, finishedExercises: action.payload }
        case fromTraining.START_TRAINING:
            return { ...state, activeTraining: action.payload }
        case fromTraining.STOP_TRAINING:
            return { ...state, activeTraining: null }
        default:
            return state
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises)
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises)
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining)
