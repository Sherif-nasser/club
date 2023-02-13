import frappe
from frappe.model.document import Document
from hrms.hr.doctype.attendance.attendance import Attendance

class modefiedClass(Document):
    def validate_attendance_date(self):
	    print("\n\n\n\n\n Overridden \n\n\n\n\n\n")