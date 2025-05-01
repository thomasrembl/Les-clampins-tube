import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';  
import ItemModel from '../../models/Items';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { projectName } = req.body;

      if (!projectName) {
        return res.status(400).json({ error: 'projectName is required' });
      }

      await connectToDatabase();

      const item = await ItemModel.findOne({ projectName });

      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.status(200).json({ urlList: item.urlList });
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ error: 'Failed to fetch item' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}