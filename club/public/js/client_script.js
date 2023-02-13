var days_dates = [];

frappe.ui.form.on('Monthly Allocation', {
	refresh(frm) {
	    var startDate = 0 || frm.doc.from ;
        var endDate = 0||frm.doc.to;
        
	},
	before_save:function(frm){

	    $.each(frm.doc.allocation_details || [], function(i, row) {
	        var days = days_dates;
	        var week_days = [];
	        
            week_days.push(row.sunday,row.monday,row.tuesday,row.wednesday,row.thursday,row.friday,row.saturday);
            
            for(let j=0;j<week_days.length;j++){
                
                var day ="Sunday";
                var employee = row.employee;
                var todayDate = frm.doc.from;
         
                
               
                if((j=1)){
                    day = "Monday";
                    // sanitize(employee,todayDate,day,days,week_days[j]);
                }
                if((j=2)){
                    day = "Tuesday";
                    // sanitize(employee,todayDate,day,days,week_days[j]);
                }
                if((j=3)){
                    day = "Wednesday";
                    // sanitize(employee,todayDate,day,days,week_days[j]);
                }
                if((j=4)){
                    day = "Thursday";
                    // sanitize(employee,todayDate,day,days,week_days[j]);
                }
                if((j=5)){
                    day = "Friday";
                    // sanitize(employee,todayDate,day,days,week_days[j]);
                }
                if((j=6)){
                    day = "Saturday";
                    // sanitize(employee,todayDate,day,days,week_days[j]);
                }
                // console.log(week_days);
                // console.log(days);
                
                sanitize(employee,todayDate,day,days,week_days[j]);
                    
            }
	        
	    });
	    
	},
	to:function(frm,cdt,cdn){
        var d = locals[cdt][cdn];
        var startDate = d.from;
        var endDate = d.to;
        get_dates_from_to(startDate,endDate);
    }
});




function get_dates_from_to (startDate, endDate) {
            let current = new Date(startDate);
            let end = new Date(endDate);
            let dates = [];
            var Year = 0||startDate.split('')[0] + startDate.split('')[1] + startDate.split('')[2] + startDate.split('')[3]+ '-';
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
            
             
            let tempDate = new Date(current.getTime());
            while(tempDate <= end){
              dates.push(new Date(tempDate));
              tempDate.setDate(tempDate.getDate() + 1);
            }
            
            
            for(let i =0;i<dates.length;i++){
                console.log(dates[i]);
                var obj= {};
                var day = days[dates[i].getDay()].toString();
                var date =  dates[i].getDate() ;
                var month = (dates[i].getMonth() +1 )+ '-';
                var full_date = Year+month+date;
                obj[day] = full_date;
                console.log(obj);
                days_dates.push(obj);
                
               
            }
            console.log(days_dates);
        }
        
        
        
        
        
function inser_doc(shift_type,date,employee,todayDate){
    // console.log(shift_type);
    if(shift_type != 'off-day'){
        
        frappe.db.insert({
            doctype: 'Shift Assignment',
            employee: employee,
            // start: date,
            start_date: date,
            end_date: date,
            shift_type: shift_type, 
            
        });
       
    }
    if(shift_type == 'off-day'){
        frappe.db.insert({
            doctype: 'Attendance',
            employee: employee,
            attendance_date: date,
            status:"Day Off"
        });
    }
 }
 
 
 function sanitize(employee,todayDate,day,days,week_day){
         for(let d=0;d<days.length;d++){
                var day_date = "";
                var shift_type="";
                        try{
                            if(day == Object.keys(days[d])[0]){
                                 day_date = Object.values(days[d])[0];
                                 shift_type = week_day;
                                
                                inser_doc(shift_type,day_date,employee,todayDate);
                                
                                // console.log(days);
                                // console.log('inside');
                            }
                            }catch(e){
                                console.log(e.message);
                            }
                    }
 }





 //////////// Client Script For Day in Attendance and Shift Assignment //////
 // ATTENDANCE //
 frappe.ui.form.on('Attendance', {
	refresh(frm) {
		
	},
	before_save:function(frm,cdt,cdn){
	    var d = locals[cdt][cdn];
	    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
	    let current_date = new Date(frm.doc.attendance_date);
	    var day = days[current_date.getDay()];
	    console.log(day);
	    console.log(current_date);
	    d.attendance_day = day;
	    frm.refresh_field("attendance_day");
	}
});
 // end ATTENDANCE //


  // Employee Checkin //
  frappe.ui.form.on('Employee Checkin', {
	refresh(frm) {
		
	},
	before_save:function(frm,cdt,cdn){
	    var d = locals[cdt][cdn];
	    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
	    let current_date = new Date(frm.doc.time);
	    var day = days[current_date.getDay()];
	    console.log(day);
	    console.log(current_date);
	    d.day_ = day;
	    frm.refresh_field("day_");
	}
});
 // end Employee Checkin  //
