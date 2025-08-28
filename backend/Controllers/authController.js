import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ZWeiOttNz3PU9WAgu5wEXIdoGl+YyuvhyEtM1SZOb1hp5RPDwf8+Z03OBeEmqqxAdPYPHm0UL3iCuczFyVQ1GQ==";

// ✅ SIGNUP
export const signup = async (req, res) => {
    console.log("Signup request body:", req.body);
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        db.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, result) => {
            if (err) {
                console.error("DB SELECT error:", err);  // ✅ LOG THIS
                return res.status(500).json({ error: err });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "Email already exists" });
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
                    [name, email, hashedPassword, role || 'learner'],
                    (err) => {
                        if (err) {
                            console.error("DB INSERT error:", err);  // ✅ LOG THIS
                            return res.status(500).json({ error: err });
                        }
                        res.status(201).json({ message: "User registered successfully" });
                    }
                );
            } catch (hashError) {
                console.error("Hashing error:", hashError);
                res.status(500).json({ message: "Password hashing failed" });
            }
        });
    } catch (error) {
        console.error("Signup Controller Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ LOGIN
export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    db.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT with role
        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
};
