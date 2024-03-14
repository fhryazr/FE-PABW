const getDecodedToken = async (token) => {
  try {
    const response = await fetch("http://localhost:3000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });
    
    if (!response.ok) {
      console.log("Gagal");
      return null;
    }

    const data = await response.json();
    return data.payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getDecodedToken