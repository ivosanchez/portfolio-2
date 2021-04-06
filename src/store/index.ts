import { InjectionKey } from 'vue';
import { createStore, GetterTree, MutationTree, Store, useStore as baseUseStore } from 'vuex';

export enum CURSOR {
  DEFAULT = 'DEFAULT',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
}

interface IState {
  cursor: CURSOR;
}
export enum MUTAIONS {
  SET_CURSOR = 'SET_CURSOR',
}
export enum GETTERS {
  GET_CURSOR = 'GET_CURSOR',
}

export const key: InjectionKey<Store<IState>> = Symbol('Injection key to vuex store');

const state: IState = {
  cursor: CURSOR.DEFAULT,
};

const mutations: MutationTree<IState> = {
  // synchronous
  [MUTAIONS.SET_CURSOR](state, payload: CURSOR) {
    state.cursor = payload;
  },
};

const getters: GetterTree<IState, IState> = {
  [GETTERS.GET_CURSOR](state) {
    return state.cursor;
  },
};

export const store = createStore<IState>({
  state,
  mutations,
  getters,
});

export const useStore = () => baseUseStore(key);
