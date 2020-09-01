
import './loading.css'

const loadingDirective = {};
loadingDirective.install = Vue => {
  Vue.directive('pageLoading', {
    bind: function(el, binding, vnode) {
      setTimeout(()=>{
        let parent = document.getElementById('app').parentNode
        const tempDiv = document.createElement('div')
        tempDiv.className = 'custom-loading'
        tempDiv.id = 'customLoading'
        const round = document.createElement('div')
        round.className = 'custom-loading-round'
        tempDiv.appendChild(round)
        if (binding.value && !document.getElementById('customLoading')) {
          parent.appendChild(tempDiv)
        }
      },10)
    },

    update: function(el, binding) {
      setTimeout(()=>{
          if (binding.value) {
            document.getElementById('customLoading').style.display = 'block'
          } else {
            document.getElementById('customLoading') ? document.getElementById('customLoading').style.display = 'none' : ''
          }
      },10)
    },

    unbind: function(el, binding) {
      setTimeout(()=>{
        document.getElementById('customLoading').style.display = 'none'
      },10)
    }
  });
};

export default loadingDirective;
