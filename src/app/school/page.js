"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/css/SchoolPage.module.css";

export default function SchoolPage() {
  const [school, setSchool] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);

    async function fetchData() {
      try {
        const res = await fetch("/api/school");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setSchool(data);
      } catch (error) {
        console.error("Failed to fetch school data:", error);
        setSchool(null);
      }
    }
    fetchData();
  }, []);

  if (!hydrated) return null;

  return (
    <div className={styles.overlay}>
      {school ? (
        <div className={styles.schoolInfo}>
          <h1 className={styles.title}> {school.name}</h1>
          <p className={styles.description}>
            <strong>Description: </strong> {school.description}
          </p>
          <p className={styles.contact}>
            <strong>Contact: </strong>
            {school.contact}
          </p>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => router.push("http://localhost:3001")}
            >
              Home Page
            </button>
            <button
              className={styles.button}
              onClick={() => router.push("/login")}
            >
              Admin Login
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </div>
  );
}
