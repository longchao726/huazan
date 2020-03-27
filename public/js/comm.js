//获取当前元素的第n位父元素
function getParent(elem,n) {
  while(elem && n){
    elem = elem.parentNode;
    n--;
  }
  return elem;
}