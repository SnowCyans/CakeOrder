import {$post} from '../utils/request.js'
export default {
	namespaced:true,
	state:() => ({
		userInfo:null
	}),
	mutations:{
		initUser(state,info){
			state.userInfo = info
		}
	},
	actions:{
		 async updateUser(context,info){
			const res =await $post('/1.1/login',info)
			console.log(res);
			context.commit('initUser')
		}
	}
}