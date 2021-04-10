import { InjectionKey } from 'vue';
import { createStore, GetterTree, MutationTree, Store, useStore as baseUseStore } from 'vuex';

export enum CURSOR {
  DEFAULT = 'DEFAULT',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
}

export type TLanguage = 'ko' | 'en';

// ==============
// STATES
// ==============

export interface IState {
  cursor: CURSOR;
  isMenuOpen: boolean;
  language: TLanguage;
}

export const key: InjectionKey<Store<IState>> = Symbol('Injection key to vuex store');

const state: IState = {
  cursor: CURSOR.DEFAULT,
  isMenuOpen: false,
  language: 'ko',
};

// ==============
// MUTATIONS
// ==============

export enum MUTAIONS {
  SET_CURSOR = 'SET_CURSOR',
  TOGGLE_MENU = 'TOGGLE_MENU',
  TOGGLE_LANGUAGE = 'TOGGLE_LANGUAGE',
}
const mutations: MutationTree<IState> = {
  // synchronous
  [MUTAIONS.SET_CURSOR](state, payload: CURSOR) {
    state.cursor = payload;
  },
  [MUTAIONS.TOGGLE_MENU](state, payload: boolean) {
    if (payload === undefined) {
      state.isMenuOpen = !state.isMenuOpen;
      return;
    }
    state.isMenuOpen = payload;
  },
  [MUTAIONS.TOGGLE_LANGUAGE](state, payload: TLanguage) {
    state.language = payload;
  },
};

// ==============
// GETTERS
// ==============

export enum GETTERS {
  GET_CURSOR = 'GET_CURSOR',
  GET_IS_MENU_OPEN = 'GET_IS_MENU_OPEN',
  GET_LANGUAGE = 'GET_LANGUAGE',
}

const getters: GetterTree<IState, IState> = {
  [GETTERS.GET_CURSOR](state) {
    return state.cursor;
  },
  [GETTERS.GET_IS_MENU_OPEN](state) {
    return state.isMenuOpen;
  },
  [GETTERS.GET_LANGUAGE](state) {
    return state.language;
  },
};

// ==============
// STORE
// ==============

export const store = createStore<IState>({
  state,
  mutations,
  getters,
});

export const useStore = () => baseUseStore(key);
