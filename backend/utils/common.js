 /**
 * checkUniqueFieldsInDatabase:check unique fields in database for insert and update
 *@param {object} model:mopngoose model instance of collection
 *@param {Object} data:data which will be inserted or updated
 *@param {Array} fieldsToCheck:array of fields to checked in database
 *@param {String} operation :operation identification.
 *@return {Object}:information about duplicate fields.
 */
 export const  checkUniqueFieldsInDatabase = async (model,data,fieldsToCheck,operation)=>{
    switch(operation){
        case 'REGISTER':
            for(let field of fieldsToCheck){
                let found = await model.findOne({ [field]: data[field] });
                if(found){
                  return { 
                    isDuplicate:true,
                    field:field,
                    value:data[field]
                }

                }
                        
            }
            break;
            default:{
                return {
                    isDuplicate:false
                    }
                    break;
            }
    }
 }
 

 