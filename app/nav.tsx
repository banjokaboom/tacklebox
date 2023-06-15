export default function Nav() {
  return (
    <nav className="p-24 pt-16 pb-16 bg-cyan-600 mx-auto">
      <div className="mx-auto max-w-5xl flex lg:flex-row flex-col lg:items-center justify-between ">
        <a className="lg:pb-0 pb-4 w-fit" href="/">
          Home
        </a>
        <a className="lg:pb-0 pb-4 w-fit" href="/can-i-fish">
          Can I Fish
        </a>
        <a className="lg:pb-0 pb-4 w-fit" href="/oil-prices">
          Oil Prices
        </a>
        <a className="lg:pb-0 pb-4 w-fit" href="/what-to-fish">
          What To Fish
        </a>
        <a className="lg:pb-0 pb-4 w-fit" href="/what-to-make">
          What To Make
        </a>
      </div>
    </nav>
  )
}
