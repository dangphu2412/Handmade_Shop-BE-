import cloudinary from "cloudinary";
import { CloudinaryConfig } from "../constants/secret";

cloudinary.v2.config(CloudinaryConfig);

console.log("Initializing cloundinary ....");

export const imgTransformation = {
    format: "jpg",
    quality: 75,
    resource_type: "auto",
    folder: "gallery",
};

export const uploadHandler = cloudinary.v2;
