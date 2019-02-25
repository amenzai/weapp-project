const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function generateMixed(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

function breakSection(text) {

  // let s=
}

/**
 * 对象深拷贝
 * @param {*} data
 */
function deepCopy(data) {
  const t = typeOf(data);
  let o;
  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * 判断数据类型
 * @param {*} dataType
 */
function typeOf(dataType) {
  return Object.prototype.toString.call(dataType).slice(8, -1).toLowerCase()
}

/**
 * 删除 参数对象中为空的属性
 * @param {*} data
 */
function removeEmptyProp(data) {
  var o = deepCopy(data);
  for (var k in o) {
    if (typeOf(o[k]) === 'string') {
      o[k] = o[k].trim()
      if (!o[k]) {
        delete o[k];
      }
    } else if (typeOf(o[k]) === 'object') {
      removeEmptyProp(o[k])
    }
  }
  return o
}


export {
  random,
  breakSection,
  removeEmptyProp
}