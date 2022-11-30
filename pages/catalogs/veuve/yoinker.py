import airtable
import re
import requests

def slugify(text):
    text = text.lower()
    return re.sub(r'[\W_]+', '-', text)


API_KEY = "keyX4yPY1qYqq1pad"
TABLE_ID = "app5RDJQQni8Itd2D"

DESTINATION_FOLDER = "pages/test-content/"


at = airtable.Airtable(TABLE_ID, API_KEY)
for result in at.iterate('Content'):
    parsed_result = result['fields']
    if 'Name' not in parsed_result:
        continue
    filename = slugify(parsed_result['Name']) + ".mdx"
    print(filename)
    with open(DESTINATION_FOLDER + filename, "w") as f:
        key_to_field = {
            "title": f"\"{parsed_result['Name']}\"",
        }
        if parsed_result.get("Type"):
            key_to_field["type"] = parsed_result["Type"]
        if parsed_result.get("Date"):
            key_to_field["date"] = parsed_result["Date"]
        if parsed_result.get("Rating"):
            key_to_field["rating"] = parsed_result["Rating"]
        if parsed_result.get('Author'):
            key_to_field['author'] = parsed_result['Author']
        if parsed_result.get('Genre'):
            key_to_field['genre'] = parsed_result['Genre']
        if parsed_result.get('Year'):
            key_to_field['year'] = parsed_result['Year']
        if parsed_result.get('Status'):
            key_to_field['status'] = parsed_result['Status']
        if parsed_result.get('Image'):
            image = parsed_result['Image'][0]['url']
            data = requests.get(image).content
            with open(DESTINATION_FOLDER + slugify(parsed_result['Name']) + ".jpg", "wb") as image_file:
                image_file.write(data)
        front_matter = "\n".join([f"{key}: {value}" for key, value in key_to_field.items()])
        f.write(f"""---
{front_matter}
---

{parsed_result.get('Summary', '')}
""")
