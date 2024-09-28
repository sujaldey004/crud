const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const { z } = require("zod");
const app = express();
app.use(express.json());
app.use(cors())


mongoose.connect("mongodb+srv://2022btechaidssujal11489:Robot%40su2004@freecluster.ugnfj.mongodb.net/Practice").then(() => {
    console.log("Connected to mongoDB");
}).catch((error) => {
    console.error("MongoDB Connection error : ", error)
});

const authentication = z.object({
    username: z.string(),
    password: z.string()
})

const userSchema = new mongoose.Schema({ username: String, password: String });
const User = mongoose.model("User", userSchema);

app.post("/api/v1/user/signup", async (req, res) => {
    console.log("req received");

    const username = req.body.username;
    const password = req.body.password;

    const response = authentication.safeParse({
        username: username,
        password: password
    });

    try {
        if (!(response.success)) {
        res.status(400).json({
            message: "Invalid Username or Password"
        })
    }
    else {
        console.log(username, password)

        const user = await User.create({
            username,
            password
        })

        res.send("User created Successfully")
    }
}
catch(e){
    console.log("Error creating user");
    res.status(500).json({
        message : "Internal Server Error"
    })
}
})


app.put("/api/v1/user/update/:id", async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    console.log(updatedData.username);
    console.log(updatedData.password);

    const response = authentication.safeParse({
        username: updatedData.username,
        password: updatedData.password
    })

    if (!(response.success)) {
        res.status(400).json({
            message: "Invalid Username or Password"
        })
    }
    else {
        console.log("request received : ", userId, updatedData)

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        res.json({
            msg: "User updated successfully",
            updatedUser
        })
    }
})

app.delete("/api/v1/user/delete/:id", async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        res.json({
            msg: "User Not Found!"
        });
    }
    else {
        res.json({
            msg: "User deleted Successfully : ", deletedUser
        });
    }

})

app.get("/api/v1/users", async (req, res) => {
    const allUsers = await User.find({});
    res.json({
        allUsers,
        msg: "Server is working"
    })
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})