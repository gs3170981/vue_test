/*el
data
computed
watch
mounted
methods*/
const T = {
  container: document.createDocumentFragment(),
  'v-for' (obj) {
    let row = document.createDocumentFragment()
    let child = obj.child
    let f_arr = obj.val.split(' ')
    
    
//  for (let i = 0; i < child.length; i++) {
//    row.appendChild()
//  }
//  let p = document.createElement("p");
  }
}
const F = {
  $ (dom) {
    return document.getElementById(dom.substring(dom[0] === '#' ? 1 : 0, dom.length))
  },
  dom_rec (data) {
    let child = data.el.children
    for (let i = 0; i < child.length; i++) {
      let c_attr = child[i].attributes
      let c_child = child[i].children
      for (let j = 0; j < c_attr.length; j++) {
        let key = c_attr[j].name
        let val = c_attr[j].value
        T[key] && T[key]({
          val: val,
          child: c_child,
          data
        })
      }
    }
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
    let el_json = F.dom_rec(this.data)
  }
  
  
  
//var fragment = document.createDocumentFragment();
//for(var i = 0; i < 10; i++) {
//    var spanNode = document.createElement("span");
//    spanNode.innerHTML = "number:" + i;
//    fragment.appendChild(spanNode);
//}
//document.body.appendChild(spanNode);
}
