const axios = require("axios");
const { request } = require("express");

const getData = async (path) => {
  const authHeader = {
    headers: {
      Authorization:
        "Basic " + Buffer.from("bigvu:interview").toString("base64"),
    },
  };

  try {
    const response = await axios.get(
      `https://interviews.bigvu.tv/${path}`,
      authHeader
    );
    if (response.status === 200) {
      const data = response.data;
      return data;

      // Process the retrieved data
    } else {
      throw new Error("Failed to retrieve data from the link.");
    }
  } catch (error) {
    // Handle errors
    console.error(error);
  }
};

exports.getCoursesList = async (req, res, next) => {
  const data = await getData("course/list");
  res.json(data);
};

exports.getCourse = async (req, res, next) => {
    const id = req.params.id
    const data = await getData(`course/${id}`);
    res.json(data);
  };
