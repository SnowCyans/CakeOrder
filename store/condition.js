export default {
	namespaced:true,
	  state: () => ({
	   cond:{
		   bcid:1
	   }
	  }),
	  mutations:{
		  changeCondition(state,obj){
			  state.cond = obj
		  }
	  }
}