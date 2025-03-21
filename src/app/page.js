"use client";
import { useRouter } from "next/navigation";
import styles from "./css/Home.module.css";

export default function Home() {
  const router = useRouter();

  const redirectToSchool = (schoolSubdomain) => {
    router.push(`http://${schoolSubdomain}.localhost:3001/school`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>
          Welcome to the Multi-Tenant School System
        </h1>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => redirectToSchool("school1")}
          >
            Go to School 1
          </button>
          <button
            className={styles.button}
            onClick={() => redirectToSchool("school2")}
          >
            Go to School 2
          </button>
        </div>
      </div>
    </div>
  );
}
