#!/usr/bin/env node
const fse = require('fs-extra')
const chalk = require('chalk');
const inquirer = require('inquirer')
const { program } = require('commander')
const download = require('download-git-repo')




let params = process.argv.slice(2)
console.log(process.argv)
if (params.includes('user')) {
    console.log(`收到参数"${chalk.red('user')}",${chalk.blue.underline.bold('创建user文件')}`)
    fse.createFileSync('./user.js')
  }
  if (params.includes('utils')) {
    console.log(`收到参数"${chalk.red('utils')}",${chalk.blue.underline.bold('创建utils文件')}`)
    fse.createFileSync('./lib/utils.js')
  }


  const questions = [
    {
      type: 'input',
      name: 'name',
      message: '请输入你的真实姓名',
      default: '战士'
    },
    {
      type: 'input',
      name: 'phone',
      message: '请输入11位手机号',
      validate:val=>{
              if(val.match(/\d{11}/g)){
                  return true
              }
              return '请输入11位数字'
          }
    },
    {
          type:'password',
          message:'请输入你的银行卡密码：',
          name:'pwd'
      }
  ]
  
  inquirer.prompt(questions).then(answer => {
    console.log(answer)
    download('https://github.com:trifling46/jquery.lslValidateForm#master', 'name', {clone: true}, err => {
      console.log(err )
    })
    fse.copy(__dirname + '/template', './newLib', (err) => {
      if(err) throw err
      console.log('项目模板拷贝成功')
    })
  })
  

program.version('0.0.1') // 设置版本
program
  .option('-e, --eat', '今晚吃饭吗') // 普通用法
  .option('-w, --what-food <type>', '吃什么') // 带参数，key是两个单词
  .option('-s, --small <size>', '大份还是小份', '小份') // 带参数，并且有默认值

program.parse(process.argv) // 解析参数

console.log('所有参数:', program.opts())




 
