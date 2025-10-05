/**
 * 此脚本用于处理 Detail 相关 View 中的数据初始化/刷新
 * @version 1.0
 * 
 * TODO：detail 的 previous 和 next 是包裹在 nav 对象里的，而 category
 *       的是直接写在根节点上的，以后维护 API 时需要注意统一。
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
    if(dataType == 'detail') {
        // 如果类型是 detail
        data.nav = {
            type: 'detail',
            prev: {
                platform: resp.nav.previous.category,
                build: resp.nav.previous.build,
                route: '/detail/' + resp.nav.previous.category + '/' + resp.nav.previous.build
            },
            next: {
                platform: resp.nav.next.category,
                build: resp.nav.next.build,
                route: '/detail/' + resp.nav.next.category + '/' + resp.nav.next.build
            }
        }
        document.title = resp.build.number + ' / Windows Up-to-Date'
    } else {
        // 如果类型是 categoryList
        data.nav = {
            type: 'categoryList',
            prev: {
                platform: resp.previous.name,
                route: '/category/' + resp.previous.path
            },
            next: {
                platform: resp.next.name,
                route: '/category/' + resp.next.path
            }
        }
        document.title = resp.name + ' / Windows Up-to-Date'
    }
}
