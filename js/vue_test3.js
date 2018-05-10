/*
el
data
computed
watch
mounted
methods
*/


/*
v-if
v-else-if
v-else
v-for
v-test
*/

/*
 *
 1、v-for dom结构渲染
 2、v-test data数据渲染
 3、define单向数据驱动
 4、vdom截取
 5、再弄其他methods、生命周期等（前面完成再说）

 * */
const vue_test = (obj) => {
  const D = document
  /* 模板语法 */
  const T = {
    'v-for' (obj) {
      let {
        dom,
        data,
        source_data,
        for_data,
        key,
        again,
        val,
        index
      } = obj
      // 解析数组对象
      let item = {}
      let arr = val.split(' in ')
      arr[1] = arr[1].replace(/\s/g, "")
//    let item = F.replaceAll([{
//      b: /\s/g,
//      a: ''
//    }, {
//      b: /\[|\]/g,
//      a: '.'
//    }], arr[1]).split('.')

      if (!Object.keys(data).length) { // data为空，则为初始值传入
        item = eval('source_data.' + arr[1])
      } else {
        if (arr[1].indexOf('.') !== -1) { // 一种对象为.
          let item_index = arr[1].indexOf('.')
          item_p = arr[1].substring(0, item_index)
          item_c = arr[1].substring(item_index + 1, arr[1].length)
          
//        item = eval('data[item_p].' + item_c)
          item = eval('data.' + item_c)
          
        } else { // 一种对象为[]
          
        }
        
        
        
//      item_arr = data.split('.')
//      if (data.indexOf('.'))
      }


//    if (data[arr[1]]) { // 如果传入的data值有数据的话
//      
//      
//      
//      
//      
//      item = eval('data.' + arr[1])
//    } else {
//      item = eval('source_data.' + arr[1])
//    }


      // 解析前面的key对象
      let _key = {
//      t: arr[0].replace(/\s/g, "")
      }
      let _t = arr[0].replace(/\s/g, "")
      _key[_t] = item
      if (_t.indexOf(',') !== -1) {
        let t_arr = _t.substring(1, _t.length - 1).split(',')
        delete _key[_t]
        _key[t_arr[1]] = item
        _key[t_arr[1]][t_arr[0]] = true
//      _key.t = t_arr[1]
//      _key.i = t_arr[0]
      }
//    item = F.copy(_key[])
//    item = F.copy(Object.assign(item, _key))
//    debugger
      for_data = Object.assign(for_data ? for_data : {}, _key)
      
      for (let i = 0; i < item.length; i++) {
        let vdom = dom.cloneNode(true)
//      let _item = F.copy(Object.assign(item[i], _key))
        let _item = F.copy(item[i])
        // 与一开始的init代码内容有冗余，先实现再说 --- 方法抽离
        let _vdom = F.init({
          dom: vdom,
          source_data: source_data,
//        data: _item
          data: _item,
          for_data: for_data
        })
        dom.parentNode.appendChild(_vdom)
      }

//    child[j].remove()
//    debugger


//    index.len--
//    index.i--
//    dom.remove()
      
      return {
        no_append: true
//      dom: dom,
//      _vdom: _vdom
      }
    },
//  'v-demo' (obj) {
//    let {
//      dom,
//      data,
//      source_data,
//      key,
//      index,
//      val
//    } = obj
//  },
    'v-text' (obj) { // 如果有两个属性在同一个，则都会返回dom节点，回头修改下，bug
      let {
        dom,
        data,
        source_data,
        key,
        index,
        val
      } = obj
      let _dom = dom.cloneNode(true)
//    let value = dom.attributes[key].value
//    let
      let t = val.split('.')[0] === data.t
      let str = val.substring(val.indexOf('.') + 1, val.length)
//    let value = data.list[_i]
      let value = ''
//    debugger

//    if (t) {
//      value = eval('data.list[_i].' + str)
//    } else {
//      value = eval('source_data.' + str)
//    }

//    dom.attributes[key].value = value
      
      return _dom

//    return dom.cloneNode(true)
//    return _vdom
//    return {
//      dom: dom
//    }
    }
  }
  /* 方法集 */
  const F = {
    $ (dom) {
      return D.getElementById(dom.substring(dom[0] === '#' ? 1 : 0, dom.length))
    },
    replaceAll (arr, val) {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str = val.replace(arr[i].b, arr[i].a)
      }
      return str
    },
    copy (obj) {
      let sourceCopy = obj instanceof Array ? [] : {}
      for (let item in obj) {
        sourceCopy[item] = typeof obj[item] === 'object' ? this.copy(obj[item]) : obj[item]
      }
      return sourceCopy
    },
    recVal (t, str, val) { // 递推
      while (t[str]) {
        if (t[str]) {
          t = t[str]
        }
      }
      t[str] = {
        t: val
      }
    },
    init (obj) {
      let {
        dom,
        data,
        for_data,
        source_data
      } = obj
      let child = dom.children
      let index = {
        len: child.length,
        i: 0
      }
      let len = child.length
      for (index.i = 0; index.i < index.len; index.i++) {
        let attr = child[index.i].attributes
        let _data = F.copy(data)
        let _child = child[index.i].children
        let is = false // 默认找不到DIY属性
        
//      if (!attr.length) {
//        dom.appendChild(child[index.i])
//      }
        
        for (let j = 0; j < attr.length; j++) {
          let key = attr[j].name
          let val = attr[j].value.replace(/(^\s*)|(\s*$)/g, "")
          if (!T[key]) {
            continue
          }
          is = true
          let res_dom = T[key]({
            val: val,
            key: key,
            data: _data,
            dom: child[index.i],
//          dom: dom[i],
            source_data: source_data,
            for_data: for_data,
            index: index
//          len: len,
//          _i: i
          })
//        if (res_dom.no_append) {
//          child[index.i].remove()
//          index.len--
//        }
          if (res_dom) {
            if (!res_dom.no_append) {
              dom.appendChild(res_dom)
            }
            child[index.i].remove()
            index.len--
          }
          index.i--
        }
        if (!is && _child[0]) {
          this.init({
            dom: child[index.i],
            data: _data,
            source_data: source_data
          })
        } else if (!is) {
          dom.appendChild(child[index.i])
          index.i--
          index.len--
        }
        
      }
      return dom.cloneNode(true)
    }
  }
  /* 创建过程 */
//const L = {
//  /*
//   * 这里采用的是查找节点下是否含有diy属性
//   * 如没有则查找是否有子节点进行递归
//   * 无则结束
//   */
//  init(obj) {
//    let {
//      dom,
//      data,
////      vdom,
//      source_data
////      fn
//    } = obj
//    for (let i = 0; i < dom.length; i++) { // 对el下dom遍历
//      let child = dom[i].children
//      let c_attr = dom[i].attributes
//      let _data = F.copy(data)
//      let is = false // 默认找不到diy属性
////      let _vdom = D.createElement(dom[i].localName)
//      for (let j = 0; j < c_attr.length; j++) { // 对attr遍历
//        let key = c_attr[j].name
//        let val = c_attr[j].value.replace(/(^\s*)|(\s*$)/g, "") // 去除两边空格
////        _vdom.setAttribute(key, val) // 添加进vdom
//
//        if (!T[key]) {
//          continue
//        }
//
//        let res = T[key]({
//          val: val,
//          key: key,
//          data: _data,
//          dom: dom[i],
//          source_data: source_data
//        })
////        _data = Object.assign(_data, res)
//
//        is = true // 找到属性
//
////        console.log(_data)
////        h_data
//      }
//      if (!is && child[0]) { // 如果该节点找不到则进入子节点查找
//        this.init({
//          dom: child,
//          data: _data,
//          source_data: source_data
//        })
//      }
////      console.log(1)
//
//    }
//  }
//}
  class vue_test {
    /* 构造函数初始化,dom获取失败则中止 */
    constructor(data) {
      let el = F.$(data.el)
      if (!el) {
        return console.error('this id Non-existent!')
      } else {
        data.el = el
        this.data = data
      }
      this.init()
    }
    init() {
      let data = this.data.data
      let child = this.data.el
      let el_json = F.init({
        dom: child, // id所在的根目录不执行
        data: '',
        source_data: data
      })
    }
    //var fragment = document.createDocumentFragment();
    //for(var i = 0; i < 10; i++) {
    //    var spanNode = document.createElement("span");
    //    spanNode.innerHTML = "number:" + i;
    //    fragment.appendChild(spanNode);
    //}
    //document.body.appendChild(spanNode);
  }
  return new vue_test(obj)
}