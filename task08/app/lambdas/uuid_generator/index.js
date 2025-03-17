const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.TARGET_BUCKET || "uuid-storage";

exports.handler = async () => {
    try {
        // Generate 10 random UUIDs
        const ids = Array.from({ length: 10 }, () => uuidv4());

        // Create file content
        const fileContent = JSON.stringify({ ids }, null, 4);

        // Generate a timestamped filename
        const fileName = new Date().toISOString();

        // Upload to S3
        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: fileContent,
            ContentType: "application/json"
        }).promise();

        console.log(`File ${fileName} uploaded successfully`);
    } catch (error) {
        console.error("Error uploading UUIDs to S3:", error);
    }
};
