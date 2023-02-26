"use client";

import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Link href={"checkbox-example"}>Checkbox example</Link>
        <Link href={"fetching-example"}>Fetching example</Link>
      </main>
    </>
  );
}
