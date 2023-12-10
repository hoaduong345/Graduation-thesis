import Profile from "./components/Profile"
import Changepassword from "./components/ChangePassword"
import PaymentAddress from "./components/PaymentAddress"
import Container from "../../../../components/container/Container"

export default function UserProfile() {

    return (
        <Container>
        <div>
            <Profile />
            <PaymentAddress/>
            <Changepassword />
        </div>

        </Container>
    )
}

