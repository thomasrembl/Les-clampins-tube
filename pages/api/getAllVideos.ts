import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb'; 
import ItemModel from '../../models/Items'; 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const items = await ItemModel.find();
      const allUrls = items.flatMap(item =>
        item.urlList.map(({ url, time }: { url: string; time: Date }) => ({
          url,
          time: time.toISOString(),
          projectName: item.projectName,
        }))
      );
      res.status(200).json({ urlList: allUrls });
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}