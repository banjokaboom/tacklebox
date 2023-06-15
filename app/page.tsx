import Nav from './nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFishFins } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cyan-600 mx-auto">
      <div className="max-w-5xl w-full">
        <div className="flex flex-row">
          <h1 className="text-3xl">Tacklebox</h1>
          <FontAwesomeIcon icon={faFishFins} className="max-h-8 ml-4" />
        </div>

        <Nav></Nav>
      </div>
    </main>
  )
}
