const express = require('express')
const app = express();
const User = require('../Models/User')
const jwt = require("jsonwebtoken");
const jwtSecret="Hiiamamankumarrathoredeveloper";
const upload = require("./fileUpload");
const User1 = require('../Models/File');

//middleware to parse the bodies
    app.use(express.json());

// signup or new user route handler
exports.signup = async (req, res) => {
    try {
        // Get data
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",

            });
        }

        // Create a new user entry in the database
        const user = await User.create({
            name,
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User registration failed, please try again later",
        });
    }
};

// login route handlers

exports.login = async (req, res) => {
    let email = req.body.email;

    try {
        let userData = await User.findOne({ email });
        let fileData = await User1.findOne({email});

         let password = userData.password;

        if (!userData || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter the correct credentials",
            });
        }

        const data = {
            user: {
                id: userData.id,
                name: userData.name,
            },
            file: {
                video: fileData ? fileData.videoUrl : null,
            }
        };
        const authToken = jwt.sign(data, jwtSecret);

        return res.json({
            success: true,
            authToken: authToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while logging in",
        });
    }
};


