# JSON2CSV
Very basic JSON2CSV script. Converts a list of JSON files into either a combined CSV file or separate CSV files. Uses the library `json2csv` to convert JSON files into the proper format.

## Configuration
To modify how the script runs, simply change the `config.json` file to your liking:
```json
{
    "combine": false,
    "file_name": "combined.csv"
}
```
The `combine` field takes a boolean of whether to combine all JSON data into one CSV file or to write each file as a separate CSV. The `file_name` field takes a string and is only needed if the `combine` field is true. If it is, then the script will write everything into the file name specified.

## Running the Script
Put all JSON files you want to convert into the `/files/JSON` folder. NodeJS is required to run the script of course. Just run the command below:
```
$ node index
```
That's it. This "project" was requested by my dad.