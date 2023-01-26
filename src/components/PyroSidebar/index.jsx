import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import PyroLogo from "@/assets/images/pyro-logo-no-text.svg";
import { DevWalletIcon, PortfolioIcon } from "../Icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PyroSidebar() {

  const router = useRouter();

  return (
    // on mobile, display a hamburger menu which allows for toggling the sidebar
    <Sidebar
      style={{
        height: "100vh",
        border: "none",
        position: "fixed",
        zIndex: "4",
      }}
      backgroundColor="#202020"
      defaultCollapsed={true}
    >
      <div className="flex justify-center pt-4">
        <img src={PyroLogo.src} alt="" />
      </div>
      <Menu
        style={{ paddingTop: "3rem" }}
        menuItemStyles={{
          root: {
            fontSize: "18px",
            fontFamily: "Nexa-Regular",
            color: "#FFFFFF",
            // paddingLeft: collapsed ? "0rem" : "1rem",
            // paddingRight: collapsed ? "0rem" : "1rem",
          },
          button: {
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: "#FB203233",
            },
          },
        }}
      >
        <MenuItem component={<Link href="/portfolio"/>} icon={<PortfolioIcon pathFill={router.pathname == "/portfolio" ? "#FA6C20" : "#565555"} />}>Portfolio</MenuItem>
        <MenuItem component={<Link href="/dev-wallet"/>} icon={<DevWalletIcon pathFill={router.pathname == "/dev-wallet" ? "#FA6C20" : "#565555"} />}>Dev Wallet</MenuItem>
      </Menu>
    </Sidebar>
  );
}
