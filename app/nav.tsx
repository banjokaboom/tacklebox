export default function Nav() {
  return (
    <nav className="p-24 pt-16 pb-16 bg-cyan-700 mx-auto">
      <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-between items-start">
        <a className="lg:pb-0 pb-4 w-fit" href="/">
          Home
        </a>
        <div className="flex flex-col justify-between lg:pb-0 pb-4">
          <h4 className="text-lg pb-4 underline">Fishing</h4>
          <a className="w-fit" href="/can-i-fish">
            Can I Fish
          </a>
          <a className="w-fit" href="/what-to-fish">
            What To Fish
          </a>
        </div>
        <div className="flex flex-col justify-between lg:pb-0 pb-4">
          <h4 className="text-lg pb-4 underline">Miscellaneous</h4>
          <a className="w-fit" href="/oil-prices">
            Oil Prices
          </a>
          <a className="w-fit" href="/what-to-make">
            What To Make
          </a>
        </div>
      </div>
    </nav>
  )
}
