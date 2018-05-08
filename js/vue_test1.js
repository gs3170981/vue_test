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
const vue_test = (obj) => {
  const D = document
  /* 模板语法 */
  const T = {
    container: D.createDocumentFragment(),
    'v-for': {
      'Handle' (obj, fn) {
        let {
          dom,
          data,
          source_data,
          key,
          val
        } = obj
        let arr = val.split(' in ')
        // 对后面对象的处理
        let arr_after = F.replaceAll([
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
        let arr_a_val = ''
        for (let i = 0; i < arr_after.length; i++) {
          if (!arr_a_val) {
            arr_a_val = data[arr_after[i]] ? data[arr_after[i]] : source_data[arr_after[i]]
          } else {
            if (arr_a_val.length) {
              _c = []
              for (let _i = 0; _i < arr_a_val.length; _i++) {
                _c.push(arr_a_val[_i][arr_after[i]])
              }
              arr_a_val = _c
            } else {
              arr_a_val = arr_a_val[arr_after[i]]
            }
          }
        }
        // 对前面下标的处理
        let arr_b = arr[0].replace(/\s/g, "")
        let arr_b_val = {
          _for: data['_for']
        }
        let for_key = {} // 方便取对象，比如t = 自定义命名的ttt
//      if (data._for && data._for.child) {
//
//      }
        arr_b_val[key] = true
        if (arr_b.indexOf(',') !== -1) {
          arr_b = arr_b.substring(1, arr_b.length - 1).split(',')
          for_key['t'] = arr_b[0]
          for_key['i'] = arr_b[1]
          arr_b_val[arr_b[0]] = arr_a_val
          arr_b_val[arr_b[1]] = true
        } else {
          for_key = arr_b
          arr_b_val[arr_b] = arr_a_val
        }
        if (data['v-for']) {
          F.recVal(arr_b_val['_for'], 'child', for_key)
        } else {
          arr_b_val['_for'] = for_key
//        data['_for'] = for_key
        }
//      arr_b_val['_for'] =

//      debugger
        return arr_b_val
      },
      'Render' (obj) {
        let {
          dom,
          vdom,
          data,
          source_data
        } = obj
        console.log(obj)
        let d_child = data._for.child
        let item = data[data._for.t]
        let _vdom = []
//      let vdom
        if (d_child) {
          // 含有子的话
        }
        for (let i = 0; i < item.length; i++) {
          // 先测试返回vdom
          let item_dom = D.createElement(dom.localName)
          _vdom.push(item_dom)
        }
//      debugger
        return _vdom
      }
    },
    'v-demo': {
      'Handle' (obj, fn) {

//      typeof (fn) === 'function' && fn({
//        test: false
//      })
      },
      'Render' () {

      }
    },
    'v-test': {
      'Handle' (obj, fn) {

//      typeof (fn) === 'function' && fn({
//        test: false
//      })
      },
      'Render' () {

      }
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
    init(obj) {
      let {
        dom,
        data,
        vdom,
        source_data,
//      fn
      } = obj
      let _this = this
      for (let i = 0; i < dom.length; i++) { // 对el下dom遍历
        let child = dom[i].children
        let c_attr = dom[i].attributes
        let _data = F.copy(data)
        let _vdom = D.createElement(dom[i].localName)
//      if (container) {
//        T.container.
//      }

//      console.log('start', dom[i].localName)

        for (let j = 0; j < c_attr.length; j++) { // 对attr遍历
          let key = c_attr[j].name
          let val = c_attr[j].value.replace(/(^\s*)|(\s*$)/g, "") // 去除两边空格

          _vdom.setAttribute(key, val) // 添加进vdom

          if (!T[key]) {
            continue
          }
          let res = T[key]['Handle']({
            val: val,
            key: key,
            data: _data,
            dom: dom[i],
            source_data: source_data
          })
          _data = Object.assign(_data, res)

//        console.log(_data)
//        h_data
        }
//      console.log('start', dom[i].localName)

        if (data['v-for']) { // 如果含有v-for属性并为true时，则执行render

          let com_dom = T['v-for']['Render']({
            data: data,
            vdom: vdom,
            dom: dom[i],
            source_data: source_data
          })
//        debugger
          if (!child[0]) {
            for (let _i = 0; _i < com_dom.length; _i++) {
              vdom.appendChild(com_dom[_i])
            }
            console.log(vdom)
          }



        }

        if (child[0]) {
//        debugger

          this.init({
            vdom: _vdom,
            dom: child,
            data: _data,
            source_data: source_data,
          })
        }

//      console.log('end', dom[i].localName, obj)
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