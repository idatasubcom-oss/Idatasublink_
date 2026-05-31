const axios = require("axios");

// ================= GET MONNIFY ACCESS TOKEN =================
async function getMonnifyToken() {
  try {
    const auth = Buffer.from(
      `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
    ).toString("base64");

    const response = await axios.post(
      `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.responseBody.accessToken;

  } catch (error) {
    console.error("Monnify Auth Error:", error.response?.data || error.message);
    throw new Error("Unable to get Monnify token");
  }
}

module.exports = {
  getMonnifyToken
};
