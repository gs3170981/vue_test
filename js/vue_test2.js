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

/* 先实现一个简单的DIY字符串模板渲染 */
const vue_test = (obj) => {
  const D = document
  /* 模板语法 */
  const T = {
    'v-for' (obj) {
      let {
        dom,
        data,
        source_data,
        key,
        val
      } = obj
      let arr = val.split(' in ')

//    dom = dom.cloneNode(true)
      let child = dom.children


      let item = {
        t: arr[0].replace(/\s/g, ""),
        list: ''
        // i
      }
      /*
       * 对后面数组对象解析
       */
      let _item = F.replaceAll([
        {
          b: /\s/g,
          a: ''
        }, {
          b: /\[/g,
          a: '.'
        }, {
          b: /\]/g,
          a: '.'
        }
      ], arr[1]).split('.')
      for (let i = 0; i < _item.length; i++) {
        if (!item.list) {
          item.list = data.list && _item[i] === data.t ? data.list : source_data[_item[i]]
        } else {
          if (item.list.length) {
            _arr = []
            for (let _i = 0; _i < item.list.length; _i++) {
              _arr.push(item.list[_i][_item[i]])
            }
            item.list = _arr
          } else {
            item.list = item.list[_item[i]]
          }
        }
      }
      /*
       * 对前面t、i解析
       */
      if (item.t.indexOf(',') !== -1) {
        let t_arr = item.t.substring(1, item.t.length - 1).split(',')
        item.t = t_arr[0]
        item.i = t_arr[1]
      }
      let _data = F.copy(item)


      let c_len = child.length

      for (let j = 0; j < c_len; j++) { // 遍历子节点

        let vdom = ''
        let c_attr = child[j].attributes

//      let dom_copy = child[j]

        for (let i = 0; i < item.list.length; i++) { // 遍历次数


//        let _vdom = D.createElement(dom[i].localName)

          console.log('start', child[j].localName)

          // for遍历有bug
//        debugger

          for (let z = 0; z < c_attr.length; z++) { // 对attr遍历
            let key = c_attr[z].name
            let val = c_attr[z].value.replace(/(^\s*)|(\s*$)/g, "") // 去除两边空格

//          _vdom.setAttribute(key, val) // 添加进vdom

            if (!T[key]) {
              continue
            }
            vdom = T[key]({
              val: val,
              key: key,
              data: _data,
              dom: vdom ? vdom : child[j],
              source_data: source_data
            })


          }
//        debugger
          if (vdom) { // for还没想好return
            dom.appendChild(vdom)
//          j--
          }
          console.log('end', child[j].localName)

        }
        child[j].remove()
        j--
        c_len--
      }
      return dom.cloneNode(true)
    },
    'v-demo' (obj) {
      let {
        dom,
        data,
        source_data,
        key,
        val
      } = obj
//    debugger
//    let _vdom = D.createElement(dom.localName)
//    let _attr = dom.attributes
//    for (let i = 0; i < _attr.length; i++) {
//      let key = _attr[i].name
//      let val = _attr[i].value.replace(/(^\s*)|(\s*$)/g, "") // 去除两边空格
//      _vdom.setAttribute(key, val)
//    }
//    return _vdom
      return dom.cloneNode(true)
    },
    'v-test' (obj) { // 如果有两个属性在同一个，则都会返回dom节点，回头修改下，bug
      let {
        dom,
        data,
        source_data,
        key,
        val
      } = obj
//    debugger
//    let _vdom = D.createElement(dom.localName)
//    let _attr = dom.attributes
//    for (let i = 0; i < _attr.length; i++) {
//      let key = _attr[i].name
//      let val = _attr[i].value.replace(/(^\s*)|(\s*$)/g, "") // 去除两边空格
//      _vdom.setAttribute(key, val)
//    }
//    return _vdom
      return dom.cloneNode(true)
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
    }
  }
  /* 创建过程 */
  const L = {
    /*
     * 这里采用的是查找节点下是否含有diy属性
     * 如没有则查找是否有子节点进行递归
     * 无则结束
     */
    init(obj) {
      let {
        dom,
        data,
//      vdom,
        source_data
//      fn
      } = obj
      for (let i = 0; i < dom.length; i++) { // 对el下dom遍历
        let child = dom[i].children
        let c_attr = dom[i].attributes
        let _data = F.copy(data)
        let is = false // 默认找不到diy属性
//      let _vdom = D.createElement(dom[i].localName)
        for (let j = 0; j < c_attr.length; j++) { // 对attr遍历
          let key = c_attr[j].name
          let val = c_attr[j].value.replace(/(^\s*)|(\s*$)/g, "") // 去除两边空格
//        _vdom.setAttribute(key, val) // 添加进vdom

          if (!T[key]) {
            continue
          }

          let res = T[key]({
            val: val,
            key: key,
            data: _data,
            dom: dom[i],
            source_data: source_data
          })
//        _data = Object.assign(_data, res)

          is = true // 找到属性

//        console.log(_data)
//        h_data
        }
        if (!is && child[0]) { // 如果该节点找不到则进入子节点查找
          this.init({
            dom: child,
            data: _data,
            source_data: source_data
          })
        }
//      console.log(1)

      }
    }
  }
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
      let child = this.data.el.children
      let el_json = L.init({
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