import {Nunito} from "next/font/google";

import './globals.css'
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModel from "./components/models/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModel from "./components/models/LoginModel";
import getCurrentUser from "./action/getCurrentUser";
import RentModel from "./components/models/RentModel";

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModel/>
          <LoginModel />
          <RegisterModel />
          <Navbar currentUser ={ currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}