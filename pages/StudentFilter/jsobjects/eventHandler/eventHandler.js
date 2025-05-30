export default {

	resetHandler(){
		if(queryBuilder.droppedDownSelected()===true){
			school_name.setSelectedOption({ label: "", value: "" });
			class_name.setSelectedOption({ label: "", value: "" });
			section.setSelectedOption({ label: "", value: "" });
			getAllStudent.run();
		}
	},
	
	filterHandler(){
		if(queryBuilder.droppedDownSelected()===true){
			getAllStudent.run()
		}
	}
};