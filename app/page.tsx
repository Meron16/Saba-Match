import Contact from "../Components/Home/Contact"
import Service from "../Components/Home/Services"
import SigninForm from "@/Components/SignForms/signinform"
import SignupForm from "@/Components/SignForms/signupform"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Contact />
      <Service/>
      <SigninForm/>
      <SignupForm/>
    </main>
  )
}
