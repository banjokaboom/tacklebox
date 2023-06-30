import Image from 'next/image'
import pond from './assets/images/pond.jpg'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">Home</h1>
        <hr className="mb-4" />
        <Image
          src={pond}
          alt="Picture of a calm pond surrounded by trees"
          className="mb-4"
        />
        <p>Welcome!</p>
      </div>
    </div>
  )
}
