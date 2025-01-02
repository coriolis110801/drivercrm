export function generateRandomId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

export function setpice(arr) {
  let zong = arr.reduce((total, item) => {
    total += item.quantity * (item.price - item.discount_amount);
    return total;
  }, 0);
  let discount = arr.reduce((total, item) => {
    total += item.quantity * item.discount_amount;
    return total;
  }, 0);
  return { zong, discount };
}

export function eqs(v1,v2) {
    if(typeof v1 !== 'object'|| v1===null||typeof v2 !== 'object'|| v2===null){
        return v1===v2
    }
    let v1keys = Object.keys(v1)
    let v2keys = Object.keys(v2)
    if(v1keys.length!==v2keys.length){
        return false
    }
    for (let key of v1keys){
        if(!v2keys.includes(key)){
            return false
        }
        if(!eqs(v1[key],v2[key])){
            return false
        }
    }
    return true
}
