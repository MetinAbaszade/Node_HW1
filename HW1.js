const fs = require('fs/promises');
const path = require('path');
const readline = require('readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function copyFilesAsync(folderName) {
    try {
        const filesInTestFolder = await fs.readdir(path.join(__dirname, 'test'));
        let fileCount = 1;

        for (const fileName of filesInTestFolder) {
            const sourceFilePath = path.join(__dirname, 'test', fileName);
            const fileExtension = path.extname(fileName);
            const newFileName = `file${fileCount}${fileExtension}`;
            const destinationFilePath = path.join(folderName, newFileName);

            await fs.copyFile(sourceFilePath, destinationFilePath);
            fileCount++;
        }
    } catch (copyError) {
        throw new Error('An error occurred while copying the file: ' + copyError);
    }
}

async function createFolder(newFolderPath) {
    try {
        await fs.mkdir(newFolderPath);
    } catch (error) {
        throw new Error('An error occurred while creating the folder: ' + error);
    }
}

function isValidFolderName(folderName) {
    const pattern = /^[^<>:"/\\|?*\x00-\x1F.]+$/;
    return folderName && pattern.test(folderName);
}

async function copyFilestoFolder() {
    const newFolderName = await rl.question('Enter the folder name: ');

    if (!isValidFolderName(newFolderName)) {
        console.error('Invalid Folder name');
        copyFilestoFolder();
        return;
    }

    const newFolderPath = path.join(__dirname, newFolderName);

    try {
        await fs.access(newFolderPath, fs.constants.F_OK);
        console.error('Folder already exists. Please enter a different folder name.');
        copyFilestoFolder();
        return;
    }
    catch {
        try {
            await createFolder(newFolderPath);
            await copyFilesAsync(newFolderPath);
            console.log('Files copied and renamed successfully.');
            rl.close();
        }
        catch (error) {
            console.error(error);
        }
    }
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});


copyFilestoFolder();
