export default {
	
	setClassDropDown(){
		let school=school_name.selectedOptionValue;
		if(school!=='') {
			let options=main.getClass(school).map( (obj) =>{ return  {'label': obj.class, 'value': obj.class } })
			class_name.setOptions(options)
		}else{
			class_name.setOptions([])
			section.setOptions([])
		}
	},
	
	setSectionDropDown(){
		let className=class_name.selectedOptionValue, school=school_name.selectedOptionValue
		if(className!=='' && school!==''){
			let options=main.getSection(school,className).map( (ele) =>{ return  {'label': ele, 'value': ele } })
			section.setOptions(options)
		}else{
			section.setOptions([])
		}
	},
	
	resetFilterHandler :async ()=>{
		//TODO: if previous value of all the dropDown is already cleared then don't execute below code
		try{
			if(queryBuilder.isAnyDropDownSelected()===true){
				school_name.setSelectedOption({ label: "", value: "" });
				class_name.setOptions([{ label: "", value: "" }]);
				section.setOptions([{ label: "", value: "" }]);
				const response=await lb_tech_handler_js.techHandlerQuery("graphql",getStudents, {})
				if(response.errors) throw new Error(response.errors);
			}
		}catch(e){
			showAlert(`filterTab.resetFilterHandler: ${e.message}`)
		}
	}
	
	
	
}