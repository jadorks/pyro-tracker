import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const data = await axios
          .get(
            `https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.DEV_WALLET_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`
          )
          .then((response) => {
            return response.data;
          });
        res.status(200);
        res.json({ status: "Success", data: data });
      } catch (error) {
        res.status(500);
        res.json({ status: "Fail", data: undefined });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
