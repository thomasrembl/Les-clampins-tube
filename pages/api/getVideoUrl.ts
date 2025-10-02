import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Missing 'url' in request body" });

  try {
    // Extraire le Key depuis l'URL complète
    const bucketUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
    console.log (bucketUrl);
    const key = url.replace(bucketUrl, ""); // ex: Lundi.mp4

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 86400 }); // 24h

    res.status(200).json({ signedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
}