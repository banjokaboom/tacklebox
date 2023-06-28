export default function Nav() {
  return (
    <nav className="p-12 lg:p-24 lg:pt-16 lg:pb-16 bg-cyan-700 mx-auto">
      <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-between items-start">
        <a className="lg:pb-0 pb-4 w-fit" href="/">
          Home
        </a>
        <div className="flex flex-col justify-between lg:pb-0 pb-4">
          <h4 className="text-lg pb-4 underline">Fishing</h4>
          <a className="w-fit" href="/pages/can-i-fish">
            Can I Fish
          </a>
          <a className="w-fit" href="/pages/what-to-fish">
            What to Fish
          </a>
        </div>
        <div className="flex flex-col justify-between lg:pb-0 pb-4">
          <h4 className="text-lg pb-4 underline">Miscellaneous</h4>
          <a className="w-fit" href="/pages/oil-prices">
            Oil Prices
          </a>
          <a className="w-fit" href="/pages/what-to-make">
            What to Make
          </a>
        </div>
      </div>
      <div className="pt-24 mx-auto max-w-5xl text-right">
        <p className="text-xs">{process.env.NODE_ENV}</p>
      </div>
    </nav>
  )
}
