import {
  setStore,
  getStore
}
from '@/utils'
export default {
  SET_MENUE_DISABLE: (state, data) => {
    state.projectInfo = data
    state.projectInfo.menueDisable = data.menueDisable
    setStore('projectInfo', state.projectInfo)
  }
}