const state =  {
  products: []
}

const getters = {
  cartLength() {
    return state.products.length;
  },
  cartList() {
    return state.products;
  },
  cartCheckedAll() {
    return getters.cartList().filter((item) => item.isChecked)
  },
  cartCheckedAllPrice() {
    return getters.cartCheckedAll().reduce((prev, item) => {
        return prev + parseFloat(item.price) * parseFloat(item.count)
     }, 0).toFixed(2)
  }
}

const mutations = {
  addCounter(state, payload) {
    if(payload.count < 99) payload.count++;
  },
  reduceCounter(state, payload) {
    if(payload.count > 1) payload.count--;
  },
  addToCart(state, payload) {
    payload.count = 1;
    payload.isChecked = true;
    state.products.push(payload);
  },
  checkProduct(state, payload) {
    payload.isChecked = !payload.isChecked;
    console.log(state.products)
  },
  checkAllProduct(state, payload) {
    state.products.forEach((item) => { item.isChecked = !payload });
  }
}

const actions = {
  addProductToCart(context, payload) {
    return new Promise((reslove, reject) => {
      // 判断是否已加入购物车
      let product = context.state.products.find((item) => item.iid === payload.iid);
      // 加入购物车数组，如存在，则增加计数
      if(product) {
        context.commit('addCounter', product);
        reslove('购物车此商品数量+1');
      } else {
        context.commit('addToCart', payload);
        reslove('商品成功加入购物车');
      }
    })
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
