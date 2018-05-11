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
 v-for dom结构渲染 √
 v-test data数据渲染
 v-show
 v-if
 v-else

 define单向数据驱动
 vdom截取
 再弄其他methods、生命周期等（前面完成再说）

 * */
const vue_test = (obj) => {
  const D = document
  /* 模板语法 */
  const T = {
    opt() { // 对模板语法初始化配置
      this['v-for'].opt = {
        rank: 1 // 排序，例如v-for要比其他所有的排序优先执行
      }
      this['v-show'].opt = {
        rank: 3
      }
      this['v-text'].opt = {
        rank: 2
      }
    },
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
      //    dom.removeAttribute(key)
      arr[0] = arr[0].replace(/\s/g, "")
      if (!Object.keys(data).length) { // data为空，则为初始值传入
        item = eval('source_data.' + arr[1])
      }
      else {
        if (arr[1].indexOf('.') !== -1) { // 一种对象为.
          let item_index = arr[1].indexOf('.')
          item_p = arr[1].substring(0, item_index)
          item_c = arr[1].substring(item_index + 1, arr[1].length)
          //        item = eval('data[item_p].' + item_c)
          item = eval('data.' + item_c)
        }
        else { // 一种对象为[]
        }
      }
      // 解析前面的key对象
      let _key = {}
      let _t = arr[0].replace(/\s/g, "")
      _key[_t] = item
      if (_t.indexOf(',') !== -1) {
        let t_arr = _t.substring(1, _t.length - 1).split(',')
        delete _key[_t]
        _t = t_arr[0]
        _key[t_arr[0]] = item
        _key[t_arr[0]][t_arr[1]] = true
      }
      for_data = Object.assign(for_data ? for_data : {}, _key)
      for (let i = 0; i < item.length; i++) {
        let vdom = dom.cloneNode(true)
        let _item = F.copy(item[i])
        for_data[_t] = _item
        // 与一开始的init代码内容有冗余，先实现再说 --- 方法抽离
        let _vdom = F.init({
          dom: vdom,
          source_data: source_data,
          //        data: _item
          data: _item,
          //        _i: i,
          for_data: for_data
        })
        dom.parentNode.appendChild(_vdom)
      }
      return {
        no_append: true
        //      dom: dom,
        //      _vdom: _vdom
      }
    },
    'v-show' (obj) {
      let {
        dom,
        data,
        source_data,
        key,
        index,
        for_data,
        val,
      } = obj
      /*
       * 1.对当前data取值
       * 2.对父级t取值
       * 3.对对象.[]取值
       * */
      let _dom = dom.cloneNode(true)
      //    let str = val.substring(val.indexOf('.') + 1, val.length)
      let value = ''
      let item = F.resolveStr(val)
      let items = for_data[item.f]
      if (items) { // TODO source_data的情况下未测，应该是失败的
        value = eval('items' + item.e)
      }
      else {
        value = eval('source_data.' + val)
      }
      if (value !== undefined && value) {
        _dom.style.display = 'none'
      }
      return _dom
    },
    'v-text' (obj) { // 如果有两个属性在同一个，则都会返回dom节点，回头修改下，bug
      let {
        dom,
        data,
        source_data,
        key,
        index,
        for_data,
        val,
      } = obj
      /*
       * 1.对当前data取值
       * 2.对父级t取值
       * 3.对对象.[]取值
       * */
      //    dom.removeAttribute(key)
      let _dom = dom.cloneNode(true)
      //    let str = val.substring(val.indexOf('.') + 1, val.length)
      let value = ''
      if (!Object.keys(data).length) { // 如果一开始data值为空的话，则取source_data
        value = eval('source_data.' + val)
      }
      else {
        let item = F.resolveStr(val)
        let items = for_data[item.f]
        if (items) { // 如果在for_data里有，则取值
          value = eval('items' + item.e)
        }
        else {
          value = eval('source_data.' + val)
        }
      }
      _dom.innerText = value
      return _dom
    }
  }
  /* 方法集 */
  const F = {
    $(dom) {
      return D.getElementById(dom.substring(dom[0] === '#' ? 1 : 0, dom.length))
    },
    /* 解析对象分离
     * 例如：ttt.message 为ttt,message
     * ttt['message']为ttt,message
     * */
    resolveStr(str) {
      let is = str.indexOf('.')
      let _is = str.indexOf('[')
      let item = {
        f: '',
        e: ''
      }
      if (is !== -1) { // 一种对象为.
        item.f = str.substring(0, is)
        item.e = str.substring(is, str.length)
        //        item = eval('data[item_p].' + item_c)
        //      item = eval('data.' + item_c)
      }
      else { // 一种对象为[]
        item.f = str.substring(0, _is)
        item.e = str.substring(_is, str.length)
      }
      return item
    },
    replaceAll(arr, val) {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str = val.replace(arr[i].b, arr[i].a)
      }
      return str
    },
    copy(obj) {
      let sourceCopy = obj instanceof Array ? [] : {}
      for (let item in obj) {
        sourceCopy[item] = typeof obj[item] === 'object' ? this.copy(obj[item]) : obj[item]
      }
      return sourceCopy
    },
    recVal(t, str, val) { // 递推
      while (t[str]) {
        if (t[str]) {
          t = t[str]
        }
      }
      t[str] = {
        t: val
      }
    },
    /* 创建过程 */
    init(obj) {
      let {
        dom, // 传进来是当前节点
        data,
        for_data,
        //      _i,
        source_data
      } = obj
      let child = dom.children
//    let index = {
//      len: child.length,
//      i: 0
//    }
      let attr_arr = []
      let attr = dom.attributes
      let _data = F.copy(data)
      
      for (let i = 0; i < attr.length; i++) {
        let key = attr[i].name
        T[key] && T[key].opt && T[key].opt.rank && attr_arr.push({
          rank: T[key].opt.rank,
          key: key,
          val: attr[i].value.replace(/(^\s*)|(\s*$)/g, "")
        })
      }
      F.sort(attr_arr, 'rank')

      for (let i = 0; i < attr_arr.length; i++) {
        let key = attr_arr.key
        let val = attr_arr.val
        /* 重新来一遍 */
       // TODO
      }
return
      
      
      
      
      
      
      //    let len = child.length
      for (index.i = 0; index.i < index.len; index.i++) {
        let attr = child[index.i].attributes
        let _data = F.copy(data)
        let _child = child[index.i].children
        let is = false // 默认找不到DIY属性
        //      if (!attr.length) {
        //        dom.appendChild(child[index.i])
        //      }
        let res_dom = ''
        let attr_arr = []
        for (let j = 0; j < attr.length; j++) {
          let key = attr[j].name
          T[key] && T[key].opt && T[key].opt.rank && attr_arr.push({
            rank: T[key].opt.rank,
            key: key
          })
          
          
//        if () T[key].opt.rank
        }
        
//      debugger
        for (let j = 0; j < attr.length; j++) {
          let key = attr[j].name
          let val = attr[j].value.replace(/(^\s*)|(\s*$)/g, "")
          if (!T[key]) {
            continue
          }
          is = true
//        debugger
          // TODO 应该是此处渲染二遍出错


          res_dom = T[key]({
            val: val,
            key: key,
            data: _data,
            dom: child[index.i],
            //          dom: dom[i],
            source_data: source_data,
            for_data: for_data,
            //          index: index,
            //          len: len,
            //          _i: _i
          })
          child[j].removeAttribute(key) // 删除该节点标识
//        j--
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
        }
        else if (!is) {
          dom.appendChild(child[index.i])
          index.i--
            index.len--
        }
      }
      return dom.cloneNode(true)
    },
    sort(arr, t) {
      let len = arr.length
      let minIndex, temp
      for (let i = 0; i < len - 1; i++) {
          minIndex = i
          for (let j = i + 1; j < len; j++) {
              if (arr[j][t] < arr[minIndex][t]) {
                  minIndex = j
              }
          }
          temp = arr[i]
          arr[i] = arr[minIndex]
          arr[minIndex] = temp
      }
      return arr
    }
  }
  class vue_test {
    /* 构造函数初始化,dom获取失败则中止 */
    constructor(data) {
      let el = F.$(data.el)
      if (!el) {
        return console.error('this id Non-existent!')
      }
      else {
        data.el = el
        this.data = data
      }
      this.init()
    }
    init() {
      let data = this.data.data
      let child = this.data.el.children
      T.opt() // 模板初始化配置
      for (let i = 0; i < child.length; i++) {
        F.init({
          dom: child[i],
          data: '',
          source_data: data
        })
      }
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