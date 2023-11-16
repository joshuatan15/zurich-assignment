import type { NextApiRequest, NextApiResponse } from "next";

interface EmailApiResponse {
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailApiResponse | { error: string }>
) {
  const { id } = req.query;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
    const data = await response.json();
    const userData: IUser = data.data;

    res.status(200).json({ email: userData.email || "" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
