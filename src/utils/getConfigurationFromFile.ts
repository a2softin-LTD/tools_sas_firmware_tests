import * as fs from "fs";
import * as path from 'path';

function getFilePath() {

// Configuring command line options
    const args = process.argv.slice(2);
    let jsonFilePath = null;

// Parameter processing
    for (let i = 0; i < args.length; i++) {
        // Check the --path or -p parameter
        if (args[i] === '--path' || args[i] === '-p') {
            // Taking the following argument as the path to the file
            if (i + 1 < args.length) {
                jsonFilePath = args[i + 1];
                break;
            } else {
                console.error('Помилка: Після параметра --path потрібно вказати шлях до файлу');
                process.exit(1);
            }
        }
        // Alternative format: --path=/path/to/file.json
        else if (args[i].startsWith('--path=')) {
            jsonFilePath = args[i].split('=')[1];
            break;
        }
    }

// Checking the existence of the file path
    if (!jsonFilePath) {
        // console.error('Error: The path to the JSON file is not specified');
        // console.error('Using:');
        // console.error('  node script.js --path /path/to/file.json');
        // console.error('  node script.js -p /path/to/file.json');
        // console.error('  node script.js --path=/path/to/file.json');
        // process.exit(1);

        return path.join(__dirname,'../../resources',"test_data.json")
    }

// Checking whether the path is absolute, if not - we convert the relative path to absolute
    const absolutePath = path.isAbsolute(jsonFilePath) ? jsonFilePath : path.resolve(jsonFilePath);

    return absolutePath
}

export function getConfigurationFromFile<TFIleView extends object = any>(): TFIleView {
    const filePath = getFilePath();

// Reading and parsing of JSON-file
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);
        // console.log('Data read successfully:');
        // console.log(data);
        return data
    } catch (err) {
        console.error(`Error while working with file ${filePath}:`, err.message);
        process.exit(1);
    }
}
