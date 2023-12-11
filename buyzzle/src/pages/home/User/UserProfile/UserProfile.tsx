import Profile from "./Components/Profile";
import Changepassword from "./Components/ChangePassword";
import PaymentAddress from "./Components/PaymentAddress";
import Container from "../../../../components/container/Container";

export default function UserProfile() {
  return (
    <Container>
      <div>
        <Profile />
        <PaymentAddress />
        <Changepassword />
      </div>
    </Container>
  );
}
