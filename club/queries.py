from alquds.qr_generator import get_qr
from frappe.www.printview import get_context
import copy
import json
import os
import re

import frappe
from frappe import _, get_module_path
from frappe.core.doctype.access_log.access_log import make_access_log
from frappe.core.doctype.document_share_key.document_share_key import is_expired
from frappe.utils import cint, sanitize_html, strip_html
from frappe.utils.jinja_globals import is_rtl



# @frappe.whitelist()
# def get_invoice(doc_name):
#     doc = frappe.get_doc('Sales Invoice', doc_name)
#     return doc.items