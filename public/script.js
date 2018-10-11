/*****************
 * Author: James Meehan
 * CS290 Database & UI scripts
 * Date: 12/12017
*********************/


document.addEventListener('DOMContentLoaded', addButton);
document.addEventListener('DOMContentLoaded', updateButton);

// delete exercises onclick of delete button
function deleteExercise(id){
        
    console.log("INSIDE DELETE");
    console.log(id);
    id = Number(id);
    var req = new XMLHttpRequest();
         
   
    var query = "/delete/" + id;

  	req.open("GET", query +"?"+"id="+id, true);
  	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  	req.addEventListener('load', function(){
  		if(req.status >= 200 && req.status < 400){
  		//	var response = JSON.parse(req.responseText);
  		//	var id = response.inserted;
  		console.log("so far so good");
  		document.location.assign('/');
  		}
  		else {
  		    "Something bad happened :(.  Please restart the app.";
  		}
         });
        req.send(query +"?" + "id="+id);
     	}

      

 // add exercises through ajax so no refresh     
 function addButton(){     
 document.getElementById('addExercise').addEventListener('click',function(event){
    
 	var addExercise = document.getElementById("addRoutine");
 	if (addExercise.name.value == ""){
 	    alert("Enter an exercise name");
 	    return;
 	}
 	var req = new XMLHttpRequest();
 

 	var query = "/insert";
 	var values = "name="+addExercise.name.value+"&reps="+addExercise.reps.value+"&weight="+addExercise.weight.value+"&date="+addExercise.date.value+"&units="+addExercise.units.value;
	
// console.log(values);

 	req.open("GET", query +"?"+values, true);
 	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
 	req.addEventListener('load', function(){
 		if(req.status >= 200 && req.status < 400){
 			var response = JSON.parse(req.responseText);
 			var id = response.inserted;
 
			// create new row to add new exercise
 			var table = document.getElementById("table");
 			var newRow = table.insertRow(-1);
 			
 			// append values to new row
 			var name = document.createElement('td');
 			name.textContent = addExercise.name.value;
 			newRow.appendChild(name);
 
 			var reps = document.createElement('td');
 			reps.textContent = addExercise.reps.value;
 			newRow.appendChild(reps);
 
 			var weight = document.createElement('td');
 			weight.textContent = addExercise.weight.value;
 			newRow.appendChild(weight);
 
      var date = document.createElement('td');
 			date.textContent = addExercise.date.value;
 			newRow.appendChild(date);
            
      console.log(addExercise.units.value);
 			var units = document.createElement('td');
 		
 			units.textContent = addExercise.units.value;
 			
 			if(units.textContent == "1")
 			  	units.textContent = "lbs";
 		    else
 			   units.textContent = "kgs";

 			newRow.appendChild(units);
            
            
 		
  			var update = document.createElement('td');
  			var link = document.createElement('a');
  			link.setAttribute('href','/newupdate/'+id);
  			var updateButton = document.createElement('button');
  			updateButton.textContent = "Update";
  			link.appendChild(updateButton);
	        	update.appendChild(link);
        	        newRow.appendChild(update);
              
        	        var delete_ = document.createElement('td');
  			var deleteButton = document.createElement('input');
  		
  			deleteButton.setAttribute('type','button');
  			deleteButton.setAttribute('id','deleteExercise');
  			deleteButton.setAttribute('value','Delete');
  			deleteButton.setAttribute('onclick', "deleteExercise(id)");
            	  	delete_.appendChild(deleteButton);
            		newRow.appendChild(delete_);
 		}
 		else {
 		    "Something bad happened :(.  Please restart the app.";
 		}
 	});


	
	// send request
 	req.send(query +"?"+values);
 	event.preventDefault();
 });
}

// update values on new page
function updateButton(){
  document.getElementById('updater').addEventListener('click', function(event){
 	var updateExercise = document.getElementById("update-exercise");
 	var req = new XMLHttpRequest();
  var id = updateExercise.id.value;
  id = Number(id);
 	var query = "/update/" + id;

 	var values = "name="+updateExercise.name.value+"&reps="+updateExercise.reps.value+"&weight="+updateExercise.weight.value+"&date="+updateExercise.date.value+"&units="+updateExercise.units.value;
	
    console.log(values);

 	req.open("GET", query +"?"+values, true);
 	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
 	req.addEventListener('load', function(){
 		if(req.status >= 200 && req.status < 400){
 		console.log("so far so good");
 		document.location.assign('/');
 		}
 		else {
 		    "Something bad happened :(.  Please restart the app.";
 		}
        });
        req.send(query +"?" + values);
       
      });
}


