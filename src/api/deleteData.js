import axios from "axios";

const deleteData = async (url, token, setLoading, setData, setError) => {
  setLoading(true);
  try {
    const res = await axios.delete(url, {
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
    throw new Error("Failed to delete the data");
  }
};
export default deleteData;
