import data
import db

if __name__ == "__main__":
    # Example: Export a DataRecord with announcement_id = 1 to XML
    record = db.load_datarecord(1)
    if record:
        xml_output = data.record_to_xml(record)
        print(xml_output)
        data.upload_xml(xml_output)
    else:
        print("DataRecord with announcement_id = 1 not found.")