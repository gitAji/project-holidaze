import axios from "axios";

const fetchData = async (url, token, setLoading, setData, setError) => {
  setLoading(true);
  try {
    const res = await axios.get(url, {
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
    throw new Error("Failed to fetch the data");
  }
};
export default fetchData;
