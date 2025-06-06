export default {
	
	
  isAnyDropDownSelected() {
    return (
      school_name.selectedOptionValue !== '' ||
      class_name.selectedOptionValue !== '' ||
      section.selectedOptionValue !== ''
    );
  },

  getAllStudentQueryBuilder() {
    const response = this.isAnyDropDownSelected();
    let whereBlock = '';
    const conditions = [];

    if (response) {
      if (school_name.selectedOptionValue !== '') {
        conditions.push(`{ school_name: { _eq: "${school_name.selectedOptionValue}" } }`);
      }
      if (class_name.selectedOptionValue !== '') {
        conditions.push(`{ class: { _eq: "${class_name.selectedOptionValue}" } }`);
      }
      if (section.selectedOptionValue !== '') {
        conditions.push(`{ section: { _eq: "${section.selectedOptionValue}" } }`);
      }

      const conditionStr = conditions.join(', ');
      whereBlock =
        conditions.length > 1
          ? `(where: { _and: [ ${conditionStr} ] })`
          : `(where: ${conditionStr})`;
    }

    return `query {
      student_data ${whereBlock} {
        roll_number
        student_name
        class
        section
        school_name
      }
    }`;
  }
};
