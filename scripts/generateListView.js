// generateView.js
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const dotExistDirectoryCreate = require('./dotExistDirectoryCreate')
const generateFile = require('./generateFile')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const { vueListTemplate, vueEditTemplate } = require('./template.listView')

log('请输入要生成的列表页面组件名称、会生成在 views/组件名/ 目录下')
let componentName = ''
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()
  /**
   * Vue页面组件路径
   */
  let componentVueName = resolve('../src/views/' + inputName, inputName)
  let componentEditVueName = resolve('../src/views/' + inputName, inputName + 'Edit')
  // 如果不是以 .vue 结尾的话，自动加上
  if (!componentVueName.endsWith('.vue')) {
    componentVueName += '.vue'
    componentEditVueName += '.vue'
  }
  /**
   * vue组件目录路径
   */
  const componentDirectory = path.dirname(componentVueName)

  const hasComponentExists = fs.existsSync(componentVueName)
  if (hasComponentExists) {
    errorLog(`${inputName}页面组件已存在，请重新输入`)
    return
  } else {
    log(`正在生成 view 目录 ${componentDirectory}`)
    await dotExistDirectoryCreate(componentDirectory)
  }
  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/')
      componentName = inputArr[inputArr.length - 1]
    } else {
      componentName = inputName
    }
    log(`正在生成 vue 列表文件 ${componentVueName}`)
    await generateFile(componentVueName, vueListTemplate(componentName))
    log(`正在生成 vue edit文件 ${componentEditVueName}`)
    await generateFile(componentEditVueName, vueEditTemplate(componentName))
    successLog('生成成功,不要忘记修改edit文件中的提示文字')
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})
