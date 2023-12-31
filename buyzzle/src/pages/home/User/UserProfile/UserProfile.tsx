import Profile from "./Components/Profile";
import Changepassword from "./Components/ChangePassword";
import PaymentAddress from "./Components/PaymentAddress";
import Container from "../../../../components/container/Container";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [LoginByGG, setLoginByGG] = useState<boolean>();
  useEffect(() => {
    function CheckGG() {
      const loginGG = localStorage.getItem("LoginByGG");
      if (loginGG != null) {
        setLoginByGG(true);
      } else {
        setLoginByGG(false);
      }
    }
    CheckGG();
  }, []);
  return (
    <Container>
      <div>
        <Profile />
        <PaymentAddress />
        {LoginByGG == true ? <></> : <Changepassword />}
      </div>
    </Container>
  );
}
