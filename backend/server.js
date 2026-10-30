require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const Endpoint = require("./models/Endpoint.js");
const CheckResult = require("./models/CheckResult.js");
const User = require("./models/User.js");
const axios = require("axios");
const bcrypt = require("bcrypt");

async function connectDB(res) {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Api sentinel server is running",
  });
});

// create the endipoint
app.post("/api/endpoints", async (req, res) => {
  try {
    const getEndpoint = await req.body;
    console.log(getEndpoint);
    if (!getEndpoint) {
      return res.status(404).json({
        success: false,
        message: "No endpoint comes.",
      });
    }
    const endpoint = await Endpoint.create(getEndpoint);
    

    return res.status(200).json({
      success: true,
      message: "Endpoint created",
      data : {
        name : endpoint.name,
        url : endpoint.url,
        method : endpoint.method,
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// get all endpoint from db;  // route may be same but get or put not same;
app.get("/api/endpoints", async (req, res) => {
  try {
    const endipoint = await Endpoint.find({}); // latest endpoint means top one;
    if(!endpoint){
      return res.status(404).json({
        success : false,
        message : "No endpoints found",
      })
    }

    return res.status(200).json({
      success: true,
      count: endipoint.length,
      data: endipoint,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "failed to fetch the endpoints" + err.message,
    });
  }
});

// get endpoint by id
app.get("/api/endpoints/:id", async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);

    if (!endpoint) {
      return res.status(400).json({
        success: false,
        message: "endpoint not found",
      });
    }

    // if found
    return res.status(200).json({
      sucess: true,
      message: "endpoint found",
      data: endpoint,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "failed to find endpoint" + err.message,
    });
  }
});

// update the endpoint
app.patch("/api/endpoints/:id", async (req, res) => {
  try {
    const endpoint = await Endpoint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!endpoint) {
      return res.status(400).json({
        success: false,
        message: "Endpoint not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "endpoint updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update" + err.message,
    });
  }
});

// delete endpoint
app.delete("/api/endpoints/:id", async (req, res) => {
  try {
    const endipoint = await Endpoint.findByIdAndDelete(req.params.id);

    // if (!endpoint) {
    //  return res.status(400).json({
    //     success: false,
    //     message: "endpoint not fount",
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "endpoint deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "falied to delte endpoint" + err.message,
    });
  }
});

// checking the endpoint health
app.post("/api/endpoints/:id/health", async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);
    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: "endpoint not found",
      });
    }
    const startTime = Date.now();
    let responseData;

    try {
      const response = await axios({
        method: endpoint.method,
        url: endpoint.url,
        timeout: 5000, // after 5sec req stop
        validateStatus: () => true,
      });
      const responseTimeMs = Date.now() - startTime;
      responseData = {
        status: response.status >= 200 && response.status < 400 ? "UP" : "DOWN",
        responseTimeMs,
        httpStatusCode: response.status,
        errorMessage: null,
        checkedAt: new Date(),
      };
    } catch (err) {
      const responseTimeMs = Date.now() - startTime;
      responseData = {
        status: "DOWN",
        responseTimeMs,
        httpStatusCode: err.response?.status ?? null,
        errorMessage: err.message || err.code || "Unknown error",
        checkedAt: new Date(),
      };
    }

    // save result in db
    const savedResult = await CheckResult.create({
      endpointId: endpoint._id,
      ...responseData,
    });

    return res.status(200).json({
      success: true,
      message: "Healthchake completed and Saved",
      data: savedResult,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Invalid endpoint id" + err.message,
    });
  }
});

// get the endpoint history
app.get("/api/endpoints/:id/history", async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);
    if (!endpoint) {
      return res.status(400).json({
        success: false,
        message: "No endpoint found",
      });
    }

    const history = await CheckResult.find({
      endpointId: endpoint._id,
    }).sort({ checkedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "History found",
      data: history,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Invalid endpoint request",
      error: err.message,
    });
  }
});

// uptime calculation
app.get("/api/endpoints/:id/uptime", async (req, res) => {
  try {
    const endpoint = await Endpoint.findById(req.params.id);
    if (!endpoint) {
      return res.status(400).json({
        success: false,
        message: "Endpoint not found",
      });
    }

    // calculate the uptime
    const totalChecks = await CheckResult.countDocuments({
      endpointId: endpoint._id,
    });

    const successChecks = await CheckResult.countDocuments({
      endpointId: endpoint._id,
      status: "UP",
    });

    const uptimePercentage =
      totalChecks === 0
        ? 0
        : Number(((successChecks / totalChecks) * 100).toFixed(2));

    return res.status(200).json({
      success: true,
      data: {
        totalChecks,
        successChecks,
        uptimePercentage,
        failedChecks: totalChecks - successChecks,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Invalid endpoint req",
      error: err.message,
    });
  }
});

// signup
app.post("/api/signup", async (req, res) => {
  try {
    const user = req.body;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credential",
      });
    }

    const pass = user.password;
    const hashPass = await bcrypt.hash(pass, 10);

    const isMatch = await bcrypt.compare(pass, hashPass);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid password",
      });
    }

    const storedUser = await User.create({
      name: user.name,
      email: user.email,
      password: hashPass,
    });

    return res.status(200).json({
      success: true,
      message: "Signup successfully",
      data: storedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error caused",
      error: err.message,
    });
  }
});

//login
app.post("/api/login", async (req, res) => {
  try {
    const user = req.body;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    const storedUser = await User.findOne({ email: user.email });
    if (!storedUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const pass = user.password;
    const isMatch = await bcrypt.compare(pass, storedUser.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid credential",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successfull",
      data: {
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

async function startServer() {
  try {
    await connectDB();
    console.log("DataBase connected");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
    console.log("Failed to connect DB");
    process.exit(1);
  }
}

startServer();
