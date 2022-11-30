import airtable
import re
import requests

def slugify(text):
    text = text.lower()
    return re.sub(r'[\W_]+', '-', text)


API_KEY = "keyX4yPY1qYqq1pad"
TABLE_ID = "app5RDJQQni8Itd2D"

DESTINATION_FOLDER = "pages/catalogs/diet/"


at = airtable.Airtable(TABLE_ID, API_KEY)
held_content = {atom['id']: atom['fields'] for atom in at.iterate('Content')}

for result in at.iterate('Diet'):
    parsed_result = result['fields']
    filename = str(parsed_result['Date']) + ".mdx"
    with open(DESTINATION_FOLDER + filename, "w") as f:
        content = "\n".join([
            f"  - {held_content[k]['Name']}"
            for k in parsed_result.get('Content', [])
        ])
        f.write(f"""---
content:
{content}
---

{parsed_result.get('Text', '')}
""")
