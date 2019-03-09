/*
 * @Author: Nirmal Jasmatiya 
 * @Date: 2019-03-05 23:29:03 
 * @Last Modified by: Nirmal Jasmatiya
 * @Last Modified time: 2019-03-09 02:32:37
 */
const {hooks} = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
	const Response = use('Adonis/Src/Response') 
	const Validator = use('Validator')
	const Database = use('Database')
  

	Response.macro('jsend', function (data = null, message = null, code = 200, status = "success") {
        if (code >= 200 && code < 300) {
        	status = "success";
        } else if (code >= 400 && code < 500) {
        	status = "fail";
        } else if (code >= 500) {
        	status = "error";
        }

        return this.status(code).json({
        	status: status,
        	message: message,
        	data: data
        });
	})

	const existsFn = async (data, field, message, args, get) => {
		const value = get(data, field)
		if (!value) {
		  /**
		   * skip validation if value is not defined. `required` rule
		   * should take care of it.
		   */
		  return
		}
	
		const [table, column] = args
		const row = await Database.table(table).where(column, value).first()
	
		if (!row) {
		  throw message
		}
	  }
	
	  Validator.extend('exists', existsFn)

})
