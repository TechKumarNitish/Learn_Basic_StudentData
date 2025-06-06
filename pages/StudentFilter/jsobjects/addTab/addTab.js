export default {
	
	setClassDropDown(){
		let school=add_tab_school.selectedOptionValue;
		if(school!=='') {
			let options=main.getClass(school).map( (obj) =>{ return  {'label': obj.class, 'value': obj.class } })
			add_tab_class.setOptions(options)
		}else{
			add_tab_section.setOptions([])
			add_tab_class.setOptions([])
		}
	},
	
	setSectionDropDown(){
		let className=add_tab_class.selectedOptionValue, school=add_tab_school.selectedOptionValue
		if(className!=='' && school!==''){
			let options=main.getSection(school,className).map( (ele) =>{ return  {'label': ele, 'value': ele } })
			add_tab_section.setOptions(options)
		}else{
			add_tab_section.setOptions([])
		}
	},
	
	clearAddStudentForm(){
		add_tab_name.setValue('');
		roll_number.setValue('');
		add_tab_class.setOptions([]);
		add_tab_section.setOptions([]);
		add_tab_school.setSelectedOption({label:'', value:''});
	}
	
}