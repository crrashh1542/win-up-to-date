import { setTitle } from './title'

/**
 * 此脚本用于处理 Detail 相关 View 中的数据初始化/刷新
 * @version 1.1
 * 
 * 参数说明：
 *    resp 即为 axios get 返回的 response.data
 *    data 应传递当前 Vue 组件的 pageData
 */
export default (respOrigin, data) => {
    let dataType = respOrigin.dataType // 获取的数据类型，区别 detail 和 category
    let resp = respOrigin.content // 获取到的数据

    // 1. 重置数据
    data.data = resp

    // 2. 关闭加载动画
    data.isLoading = false

    // 3. 设置导航栏和标题
    let prev, next
    // 如果类型是 detail
    if(dataType == 'detail') {
        // 判断是否存在上一个内容
        if(resp.nav.previous != undefined) {
            prev = {
                platform: resp.nav.previous.category,
                build: resp.nav.previous.build,
                route: '/detail/' + resp.nav.previous.category + '/' + resp.nav.previous.build
            }
        } else { prev = undefined }
        // 判断是否存在下一个内容
        if(resp.nav.next != undefined) {
            next = {
                platform: resp.nav.next.category,
                build: resp.nav.next.build,
                route: '/detail/' + resp.nav.next.category + '/' + resp.nav.next.build
            }
        } else { next = undefined }
        // 设置数据
        data.nav = { type: 'detail', prev, next }
        setTitle(resp.build.number)

    } else {
        // 如果类型是 categoryList

        // 判断是否存在上一个内容
        if(resp.nav.previous != undefined) {
            prev = {
                platform: resp.nav.previous.name,
                path: resp.nav.previous.path,
                route: '/category/' + resp.nav.previous.path
            }
        } else { prev = undefined }
        // 判断是否存在下一个内容
        if(resp.nav.next != undefined) {
            next = {
                platform: resp.nav.next.name,
                path: resp.nav.next.path,
                route: '/category/' + resp.nav.next.path
            }
        } else { next = undefined }
        // 设置数据
        data.nav = { type: 'categoryList', prev, next }
        setTitle(resp.name)
    }
    
}
