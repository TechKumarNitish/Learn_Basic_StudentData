export default {
	myVar1: [],
	myVar2: {},
	
	test:()=>{
		storeValue("activeTabId", "Filter");
	},

	checkLogin: () => {
		lb_tech_handler_js.techHandlerValidations("checkUser");
	},
	
	timeStamp:()=> {
		return lb_tech_handler_js.techHandlerMisc('timestamp');
	},
	async graphQlTechHanlder () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
		try{
			const queryType = `restapi`;
			const response = lb_tech_handler_js.techHandlerQuery(queryType, Api1);
			console.log(response)
			return response
		}catch(e){
			console.log(e)
		}
	}
}