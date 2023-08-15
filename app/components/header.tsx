'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFishFins } from '@fortawesome/free-solid-svg-icons'
import Menu from './menu'
import { GoogleLogin } from '@react-oauth/google'

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between p-12 lg:p-24 lg:pt-12 lg:pb-12 bg-slate-50 mx-auto text-slate-700 relative">
      <div className="max-w-5xl w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <Link href="/" className="text-3xl flex flex-col">
                Tacklebox
              </Link>
              <FontAwesomeIcon
                icon={faFishFins}
                className="max-h-8 h-8 ml-4 hover:-rotate-90 transition-transform"
              />
            </div>
            <span className="text-xs">an app by beardedfishapps</span>
          </div>
          <Menu />
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
            useOneTap
          />
        </div>
      </div>
    </header>
  )
}
