import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

interface MessageType {
  email: string;
  name: string;
  message: string;
}
interface ContactFormRequest extends NextApiRequest {
  body: MessageType;
}

interface ContactFormResponseData extends MessageType {
  _id?: ObjectId;
}
export default async function handler(
  req: ContactFormRequest,
  res: NextApiResponse<{ message: string; data?: MessageType }>
) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !name ||
      !message ||
      !email.includes("@") ||
      !name.trim() ||
      !message.trim()
    ) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const newMessage: ContactFormResponseData = {
      email,
      name,
      message,
    };

    let client: MongoClient;

    try {
      client = await MongoClient.connect(
        "mongodb+srv://ghelanijimmy:LearnNextJS@cluster0.ht18qzy.mongodb.net/my-blog-site?retryWrites=true&w=majority"
      );
    } catch (error) {
      return res.status(500).json({ message: "Could not connect to database" });
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (error) {
      await client.close();
      return res.status(500).json({ message: "Storing message failed" });
    }

    await client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", data: newMessage });
  }
}
