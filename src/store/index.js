import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPlanName: "",
    dateOfHire: "",
    isDeveloper: false,
    participatesInFlex: false,
    flexScheduleType: "full",
    flexDayReferenceDate: "",
    plans: [],
    ptoDates: []
  },
  mutations: {
    setState(state, payload) {
      state.selectedPlan = payload.plans ? payload.plans[0] : "";
      state.dateOfHire = payload.dateOfHire;
      state.participatesInFlex = payload.participatesInFlex;
      state.flexScheduleType = payload.flexScheduleType;
      state.isDeveloper = payload.isDeveloper;
      state.flexDayReferenceDate = payload.flexDayReferenceDate;
      state.plans = [...payload.plans];
      state.ptoDates = [...payload.ptoDates];
    },
    setSelectedPlanName(state, payload) {
      state.selectedPlanName = payload;
    },
    setUserInfo(state, payload) {
      state.dateOfHire = payload.dateOfHire;
      state.isDeveloper = payload.isDeveloper;
      state.participatesInFlex = payload.participatesInFlex;
      state.flexScheduleType = payload.flexScheduleType;
      state.flexDayReferenceDate = payload.flexDayReferenceDate;
    },
    setPlans(state, payload) {
      state.plans = [...payload];
    },
    setPtoDates(state, payload) {
      state.ptoDates = payload
    }
  },
  actions: {
    setState({ commit }, payload) {
      commit('setState', payload);
    },
    setSelectedPlanName({ commit }, payload) {
      commit('setSelectedPlanName', payload);
    },
    setUserInfo({ commit, state }, payload) {      
      commit('setUserInfo', payload);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addPlan({ commit, state }, payload) {
      commit('setPlans', [...state.plans, payload]);
      localStorage.setItem('state', JSON.stringify(state));
    },
    updatePlan({ commit, state }, payload) {
      const existingPlans = state.plans.filter(plan => plan.name !== payload.originalName);
      commit('setPlans', [...existingPlans, payload.updatedPlan]);
      localStorage.setItem('state', JSON.stringify(state));
    },
    deletePlan({ commit, state }, payload) {
      commit('setPlans', [...state.plans.filter(plan => plan.name !== payload)]);  
      localStorage.setItem('state', JSON.stringify(state));
    },
    addPtoDates({ commit, state }, payload) {
      const newDates = [];      
      for (let pto of payload.pto) {
        newDates.push({ plan: payload.planName, date: pto.date, hours: pto.hours });
      }
      const newPtoDates = [...state.ptoDates.filter(ptoDate => !newDates.find(newDate => newDate.plan === ptoDate.plan && newDate.date === ptoDate.date)), ...newDates];
    
      commit('setPtoDates', newPtoDates);
      localStorage.setItem('state', JSON.stringify(state));

    },
    deletePtoDates({ commit, state }, payload) {
      commit('setPtoDates', [...state.ptoDates.filter(ptoDate => ptoDate.planName !== payload.planName && ptoDate.date !== payload.date)] )
      localStorage.setItem('state', JSON.stringify(state));

    },
    deleteAccount() {
      localStorage.removeItem('state');
      location.reload();
    }
  },
  getters: {
    selectedPlanName: state => {
      return state.selectedPlanName;
    },
    selectedPlan: state => {
      return state.selectedPlanName === "" ? {} : state.plans.find(plan => plan.name === state.selectedPlanName);
    },
    userInfo: state => {
      return {
        dateOfHire: state.dateOfHire,
        isDeveloper: state.isDeveloper,
        participatesInFlex: state.participatesInFlex,
        flexScheduleType: state.flexScheduleType,
        flexDayReferenceDate: state.flexDayReferenceDate
      };
    },
    ptoDates: state => {
      return state.ptoDates.filter(ptoDate => ptoDate.plan === state.selectedPlanName);
    },
  },
  modules: {
  }
})

