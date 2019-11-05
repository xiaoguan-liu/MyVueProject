const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  seaLoadingPorts: state => state.baseInfo.seaLoadingPorts,
  airLoadingPorts: state => state.baseInfo.airLoadingPorts,
  seaShipLines: state => state.baseInfo.seaShipLines,
  airShipLines: state => state.baseInfo.airShipLines,
  messageSetings: state => state.baseInfo.messageSetings,
  seaNodeMessageSetings: state => state.baseInfo.messageSetings && state.baseInfo.messageSetings.filter(item => item.type === 1),
  noticeMessageSetings: state => state.baseInfo.messageSetings && state.baseInfo.messageSetings.filter(item => item.type === 0)
}

export default getters
