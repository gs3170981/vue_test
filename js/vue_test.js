/*el
data
computed
watch
mounted
methods*/
const T = {
  container: document.createDocumentFragment(),
  'v-for' (obj) {
//  let row = document.createDocumentFragment()
//  let child = obj.child
    let f_arr = obj.val.split(' ')

    let r_obj = {}
    r_obj[f_arr[0]] = obj.data[f_arr[f_arr.length - 1]]
//  for (let i = 0; i < child.length; i++) {
//    row.appendChild()
//  }
//  let p = document.createElement("p");
//  console.log(obj)
    return r_obj
  },
  'v-test' (obj) {
    let val = obj.val // 这里只处理了一层，如遇到t.a[0].asd  之类的再做处理

    let t = val.substring(0, val.indexOf('.'))
    let _obj = val.substring(val.lastIndexOf('.') + 1, val.length)
    let data = obj.data[t]
    let r_obj = []
    for (let i = 0; i < data.length; i++) {
      r_obj
    }
    
    _obj[t] = 
    return r_obj
//  console.log(obj)
    
  }
}
const F = {
  $ (dom) {
    return document.getElementById(dom.substring(dom[0] === '#' ? 1 : 0, dom.length))
  },
  dom_rec (obj) {
    /* 思路：先递归到节点最深处,从深处进行回朔处理 */
    let dom = obj.dom
    for (let i = 0; i < dom.length; i++) {
      let child = dom[i].children
      let c_attr = dom[i].attributes
      let _obj = {}
      for (let j = 0; j < c_attr.length; j++) {
        let key = c_attr[j].name
        let val = c_attr[j].value
        _obj = T[key] && T[key]({
          val: val,
          data: obj.data,
          source_data: obj.source_data // 有可能从对象顶部执行，所以要传，例如item.xx
        })
      }
      if (child) {
        this.dom_rec({
          dom: child,
          data: _obj,
          source_data: obj.source_data // 有可能从对象顶部执行，所以要传，例如item.xx
        })
      }
      console.log(_obj)
      
      
      
//    let c_attr = dom[i].attributes
//    for (let j = 0; j < c_attr.length; j++) {
//      let key = c_attr[j].name
//      let val = c_attr[j].value
//      T[key] && T[key]({
//        val: val,
//        child: c_attr[j],
//      })
//    }
//    console.log(c_attr)
    }
    
    
//  let child = obj.dom.children
//  if (child) {
//    for (let i = 0; i < child.length; i++) {
//      this.dom_rec({
//        dom: child
//      })
//    }
//  }
//  let c_attr = child[i].attributes
    
    
    
//  for (let i = 0; i < child.length; i++) {
//    let c_attr = child[i].attributes
//    let c_child = child[i].children
//    for (let j = 0; j < c_attr.length; j++) {
//      let key = c_attr[j].name
//      let val = c_attr[j].value
//      T[key] && T[key]({
//        val: val,
//        child: c_child,
//        data
//      })
//    }
//  }
  }
  
}

class vue_test {
  constructor (data) {
    let el = F.$(data.el)
    if (!el) {
      return console.error('this id Non-existent!')
    } else {
      data.el = el
      this.data = data
    }
    this.init()
  }
  init () {
    let data = this.data.data
    let child = this.data.el.children
    let el_json = F.dom_rec({
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
