import { getCityPort } from '@/api/cityport'
import { getShipLine } from '@/api/shipline'
import { getMessageSeting } from '@/api/messageSeting'

const user = {
  state: {
    seaLoadingPorts: [],
    airLoadingPorts: [],
    seaShipLines: [],
    airShipLines: [],
    messageSetings: []
  },
  mutations: {
    SET_SEALOADINGPORTS: (state, seaLoadingPorts) => {
      state.seaLoadingPorts = seaLoadingPorts
    },
    SET_AIRLOADINGPORTS: (state, airLoadingPorts) => {
      state.airLoadingPorts = airLoadingPorts
    },
    SET_SEASHIPLINES: (state, seaShipLines) => {
      state.seaShipLines = seaShipLines
    },
    SET_AIRSHIPLINES: (state, airShipLines) => {
      state.airShipLines = airShipLines
    },
    SET_MESSAGESETINGS: (state, messageSetings) => {
      state.messageSetings = messageSetings
    }
  },
  actions: {
    GetSeaLoadingPorts ({ commit }) {
      return new Promise((resolve, reject) => {
        getCityPort({
          page: 0,
          rows: 20,
          type: 0,
          isLoadingPort: true
        }).then(result => {
          if (result && result.length > 0) {
            commit('SET_SEALOADINGPORTS', result)
          } else {
            commit('SET_SEALOADINGPORTS', [])
          }

          resolve(result)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetAirLoadingPorts ({ commit }) {
      return new Promise((resolve, reject) => {
        getCityPort({
          page: 0,
          rows: 20,
          type: 1,
          isLoadingPort: true
        }).then(result => {
          if (result && result.length > 0) {
            commit('SET_AIRLOADINGPORTS', result)
          } else {
            commit('SET_AIRLOADINGPORTS', [])
          }

          resolve(result)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetSeaShipLines ({ commit }) {
      return new Promise((resolve, reject) => {
        getShipLine(0).then(result => {
          if (result && result.length > 0) {
            commit('SET_SEASHIPLINES', result)
          } else {
            commit('SET_SEASHIPLINES', [])
          }
          resolve(result)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetAirShipLines ({ commit }) {
      return new Promise((resolve, reject) => {
        getShipLine(1).then(result => {
          if (result && result.length > 0) {
            commit('SET_AIRSHIPLINES', result)
          } else {
            commit('SET_AIRSHIPLINES', [])
          }
          resolve(result)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    GetMessageSetings ({ commit }) {
      return new Promise((resolve, reject) => {
        getMessageSeting({}).then(result => {
          if (result && result.length > 0) {
            commit('SET_MESSAGESETINGS', result)
          } else {
            commit('SET_MESSAGESETINGS', [])
          }
          resolve(result)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}

export default user
