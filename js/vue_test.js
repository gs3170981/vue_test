/*el
data
computed
watch
mounted
methods*/
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
          val
        } = obj
        let arr = val.split(' in ')
        let _obj = ''
        F.replaceAll(arr[1].replace(/\s/g, ""), '[', '.', str => { // 这段到时候去优化
          F.replaceAll(str, ']', '', str => {
            // 对后面对象的处理
            var _arr = str.split('.')
            for (let i = 0; i < _arr.length; i++) {
              if (!_obj) {
                _obj = !data[_arr[i]] ? source_data[_arr[i]] : data[_arr[i]]
              } else {
                let _c = _obj[_arr[i]]
                if (_obj.length) {
                  _c = []
                  for (let _i = 0; _i < _obj.length; _i++) {
                    _c.push(_obj[_i][_arr[i]])
                  }
                }
                _obj = _c
              }
            }
            // 对前面下标的处理
            let t = arr[0].replace(/\s/g, "")
            let _t = {}
            if (t.indexOf(',') !== -1) {
              t = t.substring(1, t.length - 1)
              _arr = t.split(',')
//            _t['t'] = _arr[0]
              _t[_arr[0]] = _obj
              _t[_arr[1]] = true
//            _t['i'] = _arr[1]
            } else {
              _t[t] = _obj
            }
//          console.log(_t, _obj)
            typeof (fn) === 'function' && fn(_t)
          })
        })

      },
      'Render' () {

      }
    },
    'v-demo': {
      'Handle' (obj, fn) {

        typeof (fn) === 'function' && fn({
          test: false
        })
      },
      'Render' () {

      }
    },
    'v-test': {
      'Handle' (obj, fn) {

        typeof (fn) === 'function' && fn({
          test: false
        })
      },
      'Render' () {

      }
    },
//  'v-for' (obj, fn) {
//    let {
//      dom,
//      data,
//      source_data,
//      val
//    } = obj;
//    let _this = this
//    let child = dom.children
//
//    if (!child.length) { // 无子对象的时候return
//      return
//    }
//
//    let arr = val.split(' in ')
//    let _obj = ''
//    /* 防止item[0].child[0].val这样的情况发生 */
//    F.replaceAll(arr[1].replace(/\s/g, ""), '[', '.', str => { // 这段到时候去优化
//      F.replaceAll(str, ']', '', str => {
//        // 对后面对象的处理
//        var _arr = str.split('.')
//        for (let i = 0; i < arr.length; i++) {
//          _obj =  !_obj ? source_data[arr[i]] : _obj[arr[i]]
//        }
//        // 对前面下标的处理
//        let t = arr[0].replace(/\s/g, "")
//        let _t = {}
//        if (t.indexOf(',') !== -1) {
//          t = t.substring(1, t.length - 1)
//          _arr = t.split(',')
//          _t['t'] = _arr[0]
//          _t['i'] = _arr[1]
//        } else {
//          _t['t'] = t
//        }
//        console.log(_t, _obj)
//
//        if (child.length) {
//          _this
//        }
//
//
//      })
//    })




//    typeof (fn) === 'function' && fn(obj)

      //  let row = document.createDocumentFragment()
      //  let child = obj.child
//    let f_arr = obj.val.split(' ')
//    let r_obj = {}
//    r_obj[f_arr[0]] = obj.data[f_arr[f_arr.length - 1]]
      //  for (let i = 0; i < child.length; i++) {
      //    row.appendChild()
      //  }
      //  let p = document.createElement("p");
      //  console.log(obj)
//    return r_obj
//  },
//  'v-demo' (obj, fn) {
//    typeof (fn) === 'function' && fn(obj)
//
//  },
//  'v-test' (obj, fn) {



//    typeof (fn) === 'function' && fn(obj)


//    let {
//      dom,
//      data,
//      source_data,
//      val
//    } = obj;
//    let _obj = data[val]
//    /* 防止item[0].child[0].val这样的情况发生 */
//    if (!_obj) {
//      F.replaceAll(val, '[', '.', str => {
//        F.replaceAll(str, ']', '', str => {
//          let arr = str.split('.')
//          for (let i = 0; i < arr.length; i++) {
//            _obj =  !_obj ? source_data[arr[i]] : _obj[arr[i]]
//          }
//          dom.innerText = _obj
//        })
//      })
//      return
//    }
//    dom.innerText = _obj
//  }
  }
  /* 方法集 */
  const F = {
    $ (dom) {
      return D.getElementById(dom.substring(dom[0] === '#' ? 1 : 0, dom.length))
    },
    replaceAll (str, old, now, fn) {
      let val = str.replace(old, now)
      if (val.indexOf(old) !== -1) {
        this.replaceAll(val, old, now, val => fn(val))
      } else {
        typeof (fn) === 'function' && fn(val)
      }
    }
//  dom_rec(obj) {
//    /* 思路：先递归到节点最深处,从深处进行回朔处理 */
//    let dom = obj.dom
//    for (let i = 0; i < dom.length; i++) {
//      let child = dom[i].children
//      let c_attr = dom[i].attributes
//      let _obj = {}
//      //    let child_is = false // 判断for下是否
//      for (let j = 0; j < c_attr.length; j++) {
//        let key = c_attr[j].name
//        let val = c_attr[j].value
//        _obj = T[key] && T[key]({
//          val: val,
//          data: obj.data,
//          source_data: obj.source_data // 有可能从对象顶部执行，所以要传，例如item.xx
//        })
//      }
//      if (child) {
//        this.dom_rec({
//          dom: child,
//          data: _obj,
//          source_data: obj.source_data // 有可能从对象顶部执行，所以要传，例如item.xx
//        })
//      }
//      console.log(_obj)
//    }
//  },
  }
  /* 创建过程 */
  const L = {
    init(obj) {
      let {
        dom,
        data,
        source_data
      } = obj
      let _this = this
      for (let i = 0; i < dom.length; i++) { // 对el下dom遍历
        let child = dom[i].children
        let c_attr = dom[i].attributes
        let promise_arr = []
        for (let j = 0; j < c_attr.length; j++) { // 对attr遍历
          let key = c_attr[j].name
          let val = c_attr[j].value.replace(/(^\s*)|(\s*$)/g, "") // 去除两边空格
          if (!T[key]) {
            continue
          }
          promise_arr.push(new Promise((resolve, reject) => {
            T[key].Handle({
              val: val,
              data: obj.data,
              dom: dom[i],
              source_data: obj.source_data // 有可能从对象顶部执行，所以要传，例如item.xx
            }, obj => resolve(obj))
          }))
        }
        Promise.all(promise_arr).then(r => { // 单个dom上的attr遍历完，
          // 将处理完的数据挂在data的Handle上，用于回朔渲染使用
          let handle = {}
          for (let _i = 0; _i < r.length; _i++) {
            for (let j in r[_i]) {
              handle[j] = r[_i][j]
            }
          }


          console.log('start', handle, dom[i])
          if (child.length) {
            for (let _i = 0; _i < child.length; _i++) {
              _this.init({
                dom: [child[_i]],
                data: handle,
                source_data: source_data
              })
            }

          }
          console.log('end', dom[i])

//        T[key] && T[key]({
//          val: val,
//          data: obj.data,
//          dom: dom[i],
//          source_data: obj.source_data // 有可能从对象顶部执行，所以要传，例如item.xx
//        }, obj => resolve(obj))
        })
      }
//    for (let i = 0; i < dom.length; i++) {
//      let child = dom[i].children
//      let c_attr = dom[i].attributes
//      let promise_arr = []
//      let stop = false
//      for (let j = 0; j < c_attr.length; j++) {
//        promise_arr.push(new Promise((resolve, reject) => {
//          let key = c_attr[j].name
//          let val = c_attr[j].value.replace(/(^\s*)|(\s*$)/g, "") // 去除两边空格
//          if (T[key]) {
//            stop = true
//            T[key]({
//              val: val,
//              data: obj.data,
//              dom: dom[i],
//              source_data: obj.source_data // 有可能从对象顶部执行，所以要传，例如item.xx
//            }, obj => resolve(obj))
//          }
//        }))
//      }
//      if (stop) {
//        Promise.all(promise_arr).then(r => {
//          console.log(r)
//        })
//      } else if (child) {
//        this.init({
//          dom: child,
//          data: data,
//          source_data: source_data
//        })
//      }
//    }
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
        data: data,
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