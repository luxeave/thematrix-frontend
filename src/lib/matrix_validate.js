function MatrixValidate(values){
    const errors = {};

    if(!values.matrix){
        errors.matrix = 'Required';
    } else if(!/[0-9\\[\\]]/.test(values.matrix)){
        errors.matrix = 'Invalid matrix';
    } 

    if(!values.target){
        errors.target = 'Required';
    } 

    return errors;
}

function parseMatrixResponse(response) {
    try {                                
        if (typeof response !== 'boolean') {
            return JSON.stringify(response);
        } else {
            return 'false';
        }
    } catch (error) {
        throw new Error(error);
    }
}

export { MatrixValidate, parseMatrixResponse }