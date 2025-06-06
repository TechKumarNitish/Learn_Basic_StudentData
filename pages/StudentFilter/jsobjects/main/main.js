export default {
	dropDownData:[],
	filterParams:{},


	queryHandler:async (queryName, params={})=>{
		try{
			const response =await queryName.run(params)
			console.log(response)
			if(response.errors){
				response.errors.message=response.errors.map(obj=>obj.message).join(" | ");
			}
			return response
		}catch(e){
			showAlert("Something went wrong in main.queryHandler function");
		}
	},

	getSchoolData(school){
		return this.dropDownData.find(obj=>{
			if(obj.school_name===school) return true;
			return false;
		})
	},

	getClass(school){
		let schoolData=this.getSchoolData(school);
		if(schoolData.length===0) return [];
		return schoolData.classes
	},

	getSection(school, className){
		let classes=this.getClass(school);
		let sections=classes.find(obj=>{
			if(obj.class===className) return true;
			return false;
		})
		if(!sections) return [];
		return sections.sections;
	},

	async initialise(){
		try{
			let response=await lb_tech_handler_js.techHandlerQuery("graphql",getStudents);
			if(response.errors) throw new Error(response.errors);
			console.log(response);
			
			let student_data= response.data.data.student_data
			const result = {};

			//store dropdown data
			student_data.forEach((obj) => {
				const school_name=obj.school_name;
				const class_name=obj.class;
				const section=obj.section
				if (!result[school_name]) result[school_name] = {};
				if (!result[school_name][class_name]) result[school_name][class_name] = new Set();
				result[school_name][class_name].add(section);

			});

			this.dropDownData = Object.entries(result).map(([school, classes]) => ({
				school_name: school,
				classes: Object.entries(classes).map(([className, sections]) => ({
					class: className,
					sections: Array.from(sections),
				})),
			}));

			//TODO: also populate school_dropDown
		}catch(e){
			showAlert(`main.initialise: ${e.message}`)
		}

	},

	getStudent:async()=>{
		//TODO: if any filter is selected and there is change in selected dropDown value from it's previous e value then only below code should be executed
		try{				
			const filters = [];

			if (school_name.selectedOptionValue!=='') {
				filters.push({ school_name: { _eq: school_name.selectedOptionValue } });
			}

			if (class_name.selectedOptionValue!=='') {
				filters.push({ class: { _eq: class_name.selectedOptionValue } });
			}

			if (section.selectedOptionValue!=='') {
				filters.push({ section: { _eq: section.selectedOptionValue } });
			}

			const params = filters.length > 0 ? { _and: filters } : {};
			this.filterParams=params;

			const response= await lb_tech_handler_js.techHandlerQuery("graphql",getStudents, params);
			if(response.errors) throw new Error(response.errors)

		}catch(e){
			showAlert(`main.getStudent: ${e.message}`)
		}
	},

	addStudent: async()=>{
		try{

			let params={
				roll_number: roll_number.text,
				student_name: add_tab_name.text,
				class: add_tab_class.selectedOptionValue,
				section: add_tab_section.selectedOptionValue,
				school_name: add_tab_school.selectedOptionValue
			};

			const createStudentResponse=await lb_tech_handler_js.techHandlerQuery("graphql", createStudent, params);
			if(createStudentResponse.errors)
				throw new Error(createStudentResponse.errors)

			showAlert("Added successfully!")	

			const getStudentResponse=await lb_tech_handler_js.techHandlerQuery("graphql",getStudents, {})

			addTab.clearAddStudentForm()
			if(getStudentResponse.errors)
				throw new Error(createStudentResponse.errors)

		}catch(e){
			showAlert(`main.addStudent: ${e.message}`)
		}
	}


}