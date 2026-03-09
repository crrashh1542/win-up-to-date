'use strict'
/**
 * 此脚本用于在控制台中显示本项目相关信息
 * @author crrashh1542
 * @version 2.3
 */

import buildInfo from '../../scripts/buildInfo.json'
import packageInfo from '../../package.json'
import { buildTag } from './parseRepoInfo'

// 处理详细版本
const version = (() => {
    const packageVersion = packageInfo.version
    const buildNum = buildInfo.build
    const buildHash = buildInfo.hash

    return packageVersion + '.b' + buildNum + '.' + buildHash
})()


let styleVerName = `font-size: 14px;
                    color: #000; 
                    background-color: #8ad5b3; 
                    padding: 5px 9px;
                    border-radius: 3px 0 0 3px;
                    margin: 10px 0; `
let styleVerValue = `font-size: 14px; 
                     color: #fff; 
                     background-color: #607d8b; 
                     padding: 5px 9px;
                     border-radius: 0 3px 3px 0;
                     margin: 6px 0; `
console.log('%c%s%c%s', styleVerName, 'wutd', styleVerValue, version)
console.log('[Info] Build tag: ' + buildTag)
