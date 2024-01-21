import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";

const images_folder = path.join(__dirname, "../../public/images/");

function fullPath(image_name: string): string {
    return images_folder + image_name;
}

async function saveImage(image: UploadedFile): Promise<string> {
    const destination = fullPath(Date.now().toString() + path.extname(image.name));
    await image.mv(destination);
    return destination;
}

export { saveImage };