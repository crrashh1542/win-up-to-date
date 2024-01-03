"use strict"
/**
 * 此脚本用于在控制台中显示本项目相关信息
 * @author crrashh1542
 * @version 3.0
 */

import buildInfo from './parseRepoInfo'
const version = buildInfo[0][2].split(' (build')[0]

export default function showInfo() {
    let styleName = `font-size: 14px;
                     color: #000; 
                     background-color: #8ad5b3; 
                     padding: 5px 9px;
                     border-radius: 3px 0 0 3px;
                     margin: 10px 0;
                     `
    let styleVer = `font-size: 14px; 
                    color: #fff; 
                    background-color: #607d8b; 
                    padding: 5px 9px;
                    border-radius: 0 3px 3px 0;
                    margin: 6px 0;
                    `
    console.log('%c%s%c%s', styleName, 'wutd', styleVer, version)
}
