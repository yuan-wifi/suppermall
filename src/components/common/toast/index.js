import ToastPlug from './ToastPlug.vue'

const obj = {}

obj.install = function(Vue) {
  // 1.创建构造函数
  const toastConstructor = Vue.extend(ToastPlug);

  // 2.实例化toast，创建组件对象
   const toast = new toastConstructor();

  // 3.将组件挂载到dom上
  toast.$mount(document.createElement('div'));

  // 4.将组件的element显示到document上
  document.body.appendChild(toast.$el);

  // 将vue对象挂载到vue的属性
  Vue.prototype.$toast = toast;
}

export default obj
