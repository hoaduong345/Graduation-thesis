import Profile from "../UserProfile/Components/Profile"
import Changepassword from "../UserProfile/Components/ChangePassword"
import PaymentAddress from "../UserProfile/Components/PaymentAddress"
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

