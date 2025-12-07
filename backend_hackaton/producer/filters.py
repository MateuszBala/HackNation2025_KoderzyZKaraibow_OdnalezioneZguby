import sys
import os

parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(parent_dir)

from common import data

def filter_by_anouncement_id(records: List[DataRecords], id: int):
    return ""

def filter_by_distinkt(records: List[DataRecords], distinkt: str):
    return ""

def filter_by_title(records: List[DataRecords], title: str):
    return ""

def filter_by_item_type(records: List[DataRecords], item_type: ItemType):
    return ""

def filter_by_category(records: List[DataRecords], category: str):
    return ""

def filter_by_found_location(records: List[DataRecords], location: str):
    return ""

def filter_by_found_date(records: List[DataRecords], found_date: str):
    return ""