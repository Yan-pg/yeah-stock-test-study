import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/SideBar";
import { useEffect } from "react";
import { parseCookies } from "nookies";

export function PrivateLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = parseCookies(null).token;

    if (!token) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}
