import axios from "axios";

const putData = async (url, body, token, setLoading, setData, setError) => {
  setLoading(true);
  try {
    const res = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setData(res.data);
    setLoading(false);

    return res.data;

    // Return the response data
  } catch (err) {
    setError(err);
    setLoading(false);
    throw new Error("Failed to update the data"); // Throw an error message
  }
};

export default putData;
