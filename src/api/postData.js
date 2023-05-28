import axios from "axios";

const postData = async (url, body, token, setLoading, setData, setError) => {
  setLoading(true);
  try {
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setData(res.data);
    setLoading(false);

    return res.data;
  } catch (err) {
    setError(err);
    setLoading(false);
    throw new Error("Failed to post the data");
  }
};

export default postData;
