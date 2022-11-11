const baseUrl = "https://api2105.h5project.cn"
export const $http = (url,method = 'GET',data={}) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url:baseUrl + url,
			 method,
			 header:{
				 "X-LC-Id": "7yoqQxyLBNN9MW5rsgTGXbHL-gzGzoHsz",
				 "X-LC-Key": "hA8yGYuHjnXWRui1rzTe0C3P",
				 "Content-Type": "application/json"
			 },
			 data,
			 success:(res) => {
				 resolve(res.data)
			 },
			 fail:(err) => {
				 reject(err)
			 }
		})
	})
}

export const $get = (url,data={}) => {
	return $http(url,'GET',data)
}

export const $post = (url,data={}) => {
	return $http(url,'POST',data)
}
