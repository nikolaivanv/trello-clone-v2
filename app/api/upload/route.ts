import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuidv4 } from 'uuid';

const client = new S3Client({ region: process.env.AWS_REGION });

export async function POST(request: Request) {
  
  try {    
    const { fileName, contentType } = await request.json();
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.S3_BUCKET_NAME || 'eu-north-1',
      Key: `${uuidv4()}-${fileName}`,
      Conditions: [
        ['content-length-range', 0, 10485760],      // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    return Response.json({ url, fields });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}