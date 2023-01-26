import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function App({ Component, pageProps }) {
  return (
    <ProSidebarProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProSidebarProvider>
  );
}
