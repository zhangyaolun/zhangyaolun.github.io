import {
	RECORD_USERINFO,
  GET_USERINFO
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'

export default {
	isLogin (state,user) {
    	state.user = user
  	},
  	add(state){
	    state.count+=1;
	},
	reduce(state){
	    state.count-=1;
	}
}
