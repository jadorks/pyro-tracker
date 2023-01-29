import Head from "next/head";
import { useProSidebar } from "react-pro-sidebar";
import Footer from "../Footer";
import Navbar from "../Navbar";
import PyroSidebar from "../PyroSidebar";

import style from "./layout.module.css";

export default function Layout({ children }) {
  const { collapsed, collapseSidebar } = useProSidebar();
  return (
    <>
      <Head></Head>
      <div className={style.Layout}>
        <Navbar />
        <PyroSidebar />
        <main className={style.content}>
          {!collapsed && (
            <div
              onClick={() => {
                collapseSidebar();
              }}
              className={style.sidebar_overlay}
            ></div>
          )}
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
