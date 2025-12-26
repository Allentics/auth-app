"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);

        // basic client-side validation
        const emailTrim = email.trim();
        const passwordTrim = password;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailTrim || !emailRegex.test(emailTrim)) {
            alert("Please enter a valid email address.");
            setLoading(false);
            return;
        }
        if (!passwordTrim || passwordTrim.length < 6) {
            alert("Please enter a password with at least 6 characters.");
            setLoading(false);
            return;
        }

        console.log('register payload', { email: emailTrim });

        // 1. Create auth user
        const { data, error } = await supabase.auth.signUp({
            email: emailTrim,
            password: passwordTrim,
        });

        console.log('supabase.signUp response', { data, error });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        // 2. Insert extra data into users_profile table
        const user = data.user;

        if (user) {
            const { error: profileError } = await supabase
                .from("users_profile")
                .insert([
                    {
                        id: user.id,
                        name,
                        contact,
                        email,
                    },
                ]);

            if (profileError) {
                alert(profileError.message);
            } else {
                alert("Registration successful!");
            }
        }

        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Register</h2>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full mb-2"
            />

            <input
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="border p-2 w-full mb-2"
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-2"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full mb-2"
            />

            <button
                onClick={handleRegister}
                disabled={loading}
                className="border p-2 w-full bg-black text-white"
            >
                {loading ? "Registering..." : "Register"}
            </button>
        </div>
    );
}
