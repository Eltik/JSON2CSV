const { parse } = require('json2csv');
const fs = require("fs");
const { join } = require("path");
const config = require("./config.json");

const files = fs.readdirSync(join(__dirname, "./files/JSON"));
const csv = [];

let temp = "";

files.filter(stat => stat.endsWith(".json")).forEach(file => {
    const currentFile = join(__dirname, "./files/JSON/" + file);
    const data = fs.readFileSync(currentFile, "utf8");
    try {
        const json = JSON.parse(data);
        try {
            let data = parse(json);
            let path = null;
            if (config.combine) {
                path = join(__dirname, "./files/CSV/" + config.file_name);

                const arr = data.split("\n");
                let newString = "";
                if (temp === 0) {
                    newString = arr[0] + "\n";
                    temp++;
                }
                for (let i = 1; i < arr.length; i++) {
                    newString += arr[i] + "\n";
                }
                data = newString;
            } else {
                path = join(__dirname, "./files/CSV/" + file.replace(".json", ".csv"));
            }
            csv.push({
                content: data,
                path: path
            });
        } catch (err) {
            console.error(err);
        }
    } catch {
        console.log("Unable to parse " + data + " as JSON.");
    }
});

const promises = [];
if (config.combine) {
    let combined = "";
    csv.forEach(element => {
        combined += element.content;
    });
    promises.push(new Promise((resolve, reject) => {
        fs.writeFile(join(__dirname, "./files/CSV/" + config.file_name), combined, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    }));
} else {
    csv.forEach(element => {
        promises.push(new Promise((resolve, reject) => {
            fs.writeFile(element.path, element.content, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        }));
    });
}
Promise.all(promises).then(() => {
    console.log("Success");
})