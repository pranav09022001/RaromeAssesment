"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/css/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      router.push("/admin");
    } else {
      alert(data.error);
      if (data.error === "Admin not found Register First") {
        router.push("/register");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.title}>Admin Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <p className={styles.registerText}>Don't have an admin account?</p>
      <button
        onClick={() => router.push("/register")}
        className={styles.registerButton}
      >
        Register as Admin
      </button>
    </div>
  );
}
