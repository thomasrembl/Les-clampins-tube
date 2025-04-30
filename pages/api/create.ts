import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import ItemModel from '../../models/Items';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      await connectToDatabase();


      const { projectName, urlList } = req.body;


      if (!projectName || !urlList) {
        return res.status(400).json({ error: 'Missing required fields' });
      }


      const newItem = new ItemModel({
        projectName,
        urlList,
      });


      await newItem.save();


      res.status(201).json({ message: 'Item created successfully', item: newItem });
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Failed to create item' });
    }
  } else {

    res.status(405).json({ error: 'Method Not Allowed' });
  }
}