
export default {
  SET_MENUE_DISABLE: (state, data) => {
      state.projectInfo.menueDisable = data.menueDisable
      state.projectInfo.projectName = data.projectName
      state.projectInfo.projectInnerNum = data.projectInnerNum
      state.projectInfo.projectOuterNum = data.projectOuterNum
  }
}