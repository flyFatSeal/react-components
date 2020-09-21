'use strict'
module.exports = {
  types: [
    {value: '✨功能', name: '功能:    一个新的功能'},
    {value: '🌱完善', name: '完善:    完善一个组件'},
    {value: '🆕组件', name: '组件:    一个新的组件'},
    {value: '🐛修复', name: '修复:    修复一个Bug'},
    {value: '📝文档', name: '文档:    变更的只有文档'},
    {value: '🎨格式', name: '格式:    空格, 分号文件目录等格式修复'},
    {value: '♻️重构', name: '重构:    代码重构，注意和特性、修复区分开'},
    {value: '⚡️性能', name: '性能:    提升性能'},
    {value: '✅测试', name: '测试:    添加一个测试'},
    {value: '🔧工具', name: '工具:    开发工具变动(构建、脚手架工具等)'},
    {value: '⏪回滚', name: '回滚:    代码回退'},
    {value: '💄样式', name: '样式:    样式更改不涉及到核心代码'},
    {value: '⬆️依赖', name: '依赖:    增加代码库中的依赖'},
    {value: '⬇️依赖', name: '依赖:    去除代码库中的依赖'},
    {value: '🔥删除', name: '删除:    删除部分代码'},
  ],
  scopes: [{name: 'cil'}, {name: 'components'}, {name: 'style'}],
  // it needs to match the value for field type. Eg.: 'fix'
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  // limit subject length
  subjectLimit: 100,
}
