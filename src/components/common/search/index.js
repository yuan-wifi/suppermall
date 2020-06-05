import SearchPlug from './SearchPlug.vue'

const obj = {}

obj.install = function(Vue) {
  // 1.创建构造函数
  const searchConstructor = Vue.extend(SearchPlug);

  // 2.实例化search，创建组件对象
  const search = new searchConstructor();

  // 集成 store
  search.$store = this.$store;

  // 3.将组件挂载到dom上search
  search.$mount(document.createElement('div'));

  // 4.将组件的element显示到document上
  document.body.appendChild(search.$el);

  // 将vue对象挂载到vue的属性
  Vue.prototype.$search = search;
}

export default obj
