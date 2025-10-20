"use client";

import { login, RegisterRequest } from "@/lib/api";
import css from "./page.module.css";

export default function SignInPage() {
  const handleSubmit = async (formdata: FormData) => {
    const payload = Object.fromEntries(formdata) as RegisterRequest;
    const user = await login(payload);
    console.log(user);
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>error</p>
      </form>
    </main>
  );
}
