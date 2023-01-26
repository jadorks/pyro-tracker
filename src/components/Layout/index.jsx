import Head from "next/head";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

import style from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head></Head>
      <div className={style.Layout}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
