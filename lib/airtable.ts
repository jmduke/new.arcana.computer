import Airtable from "airtable";
import fs from "fs";

const API_KEY = "keyX4yPY1qYqq1pad";
const TABLE_ID = "app5RDJQQni8Itd2D";

type Table =
  | "Notebook"
  | "Dictionary"
  | "Content"
  | "Veuve"
  | "Press"
  | "Snippets"
  | "Years";

export const fetchAllRecords = async (table: Table): Promise<any[]> => {
  const filepath = `./public/airtable/${table}.json`;

  try {
    if (fs.existsSync(filepath)) {
      return JSON.parse(fs.readFileSync(filepath, "utf8"));
    }
  } catch (e) {
    console.log(e);
  }

  Airtable.configure({ apiKey: API_KEY });
  const base = Airtable.base(TABLE_ID);
  const records = new Promise((resolve: (value: any[]) => void, reject) => {
    let allRecords = [];
    base(table)
      .select({
        view: "Grid view",
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          records.forEach(async (item) => {
            allRecords.push(item);
          });
          fetchNextPage();
        },
        function done(err) {
          fs.writeFileSync(filepath, JSON.stringify(allRecords));
          resolve(allRecords);
        }
      );
  });
  return records;
};
