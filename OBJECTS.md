Objects 
=================

##### p = post, l = list (get)

### post new feedback
/pfeed

"id": {  
	"email": string,		// user email  
	"date": date,			// feedback date  
	"stars": [int[1,5]],	// stars in array or object?  
	"comment": string		// free comment  
	"recall":bool  
}  

### list all given feedback
/lfeed  
  
feeds= ["id" : {  
	"email": string,  
	"date": date,  
	"stars": [int[1,5]], 	// yleisarvosana, aikataulu, palvelu, siisteys?  
	"comment": string,  
	"recall": bool  
}]  

### post new assignment (order)  
/porder  

"id" : {  
	"sc_id":string,  
	"date":date,  
	"name":string,  	
	"address":string, 		//where order goes  
	"add_info":string  
}  

### list assignments (orders)
/lorders  

orders = [{  
	// muuta dataa tilauksesta  
	"id" : "sc_id",   
}]  

### list subcontractors
/lsc

"id":{  
	"name":string,  
	"address":string,  
	"y":string,			//y tunnus  
	"phone":string,  
}  

### very secure account table

accounts = [{  
	"user":string,  // plain text  
	"pass":string	// plain text  
}]  


