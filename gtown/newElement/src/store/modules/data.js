import { widgetOrderStatus,searchBrand } from '@/service/getData'
import { getToken, setToken, removeToken } from '@/utils/auth'

const odata = {
  state: {
    orderIds: '',//勾选存储的订单id
    orderStatus: '',//订单状态
    bandList:[],//品牌
  },

  mutations: {
    SET_SEACHDATA: (state) => {
      widgetOrderStatus().then(response => {
		    state.orderStatus = JSON.stringify(response.result);
		  })
    },
    SET_BANDLIST: (state) => {
      searchBrand({brandName:''}).then(response => {
  			state.bandList = [];
				if(response && (response.result.length>0)){
					response.result.forEach((v,k)=>{
						v.key = v.id + v.brandName;
						v.value = v.brandName;
						state.bandList.push(v);
			    })
		  	}
	    })
    },
    SET_ORDERIDS: (state,IdsAttr) => {
    	if(IdsAttr.index == 1){
    		if(IdsAttr.oAttr && (IdsAttr.oAttr.length>0)){
    			IdsAttr.oAttr
					IdsAttr.oAttr.forEach((v,k)=>{
						if(state.orderIds.indexOf(v.detail_id) >=0){
							
						}
						state.orderIds.push(v);
			    })
		  	}
    	}else{
    		state.orderIds = '';
    	}
    },
  },
  
  actions: {
    getOrderStatus({ commit }) {
    	commit('SET_SEACHDATA');
    },
    getBand({ commit }) {
    	commit('SET_BANDLIST');
    },
    idsAttr({ commit },idsAttr) {
    	commit('SET_ORDERIDS',idsAttr);
    }
  }
}

export default odata
