import ContentSection from '@/app/components/content'

export default function ChangeLog() {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">Changelog</h1>
        <hr className="mb-4" />

        <ContentSection
          title="v1.0.30"
          content={
            <div>
              <p className="mb-4">55ee0a8 added changelogs</p>
              <p className="mb-4">a674f62 added changelogs</p>
              <p className="mb-4">
                1931ff6 changed nav to footer, updated home page
              </p>
              <p className="mb-4">
                223908f updated message styles, added message component test
              </p>
              <p className="mb-4">d4f30dd updated message styles</p>
              <p className="mb-4">
                05cae74 changed messages to use fixed instead of absolute
              </p>
              <p className="mb-4">b3d783f fixed a few small bugs</p>
              <p className="mb-4">0d4fa10 fixed a few small bugs</p>
              <p className="mb-4">
                1659b7c slight tweak to hide message on initial page load, added
                logging in message component
              </p>
              <p className="mb-4">f693f91 added message component</p>
              <p className="mb-4">651612d sorted tackle by confidence level</p>
              <p className="mb-4">bc8c70f added adsense</p>
              <p className="mb-4">4561c12 set a static tip based on the date</p>
              <p className="mb-4">
                c28af1a updated oil prices to choose a random number to start
              </p>
              <p className="mb-4">
                ca576db added expand collapse to content sections
              </p>
              <p className="mb-4">
                8ffbd2d fixed season overlap for lure colors
              </p>
              <p className="mb-4">
                17e2704 slight tweak to how the tip renders
              </p>
              <p className="mb-4">
                ea2957c added analytics, fixed some spelling issues
              </p>
              <p className="mb-4">
                530b31b added zones, about us test, and added fishing tips to
                what to fish
              </p>
              <p className="mb-4">ac1744f fixed regulations display</p>
              <p className="mb-4">3fccc06 updated readme</p>
              <p className="mb-4">8449ce7 added loader for geolocation</p>
              <p className="mb-4">435858b fixed geolocation</p>
              <p className="mb-4">
                82abf1d updated default view of what to fish
              </p>
              <p className="mb-4">ffb13df testing geolocation more</p>
              <p className="mb-4">8295397 testing geolocation</p>
              <p className="mb-4">38d234a fixing build errors</p>
              <p className="mb-4">65edb18 slight tweak to geolocation</p>
              <p className="mb-4">9fe7632 added geolocation</p>
              <p className="mb-4">5462cde fixed typo</p>
              <p className="mb-4">
                7d6b4ba updated nav, fixed some tests, added about us
              </p>
              <p className="mb-4">
                823403d cleaned up some extra directories, updated ignore files
              </p>
            </div>
          }
          isExpandedByDefault={true}
        ></ContentSection>
        <ContentSection
          title="v1.0.0"
          content={
            <div>
              <p className="mb-4">cf9073b added weather serverless function</p>
              <p className="mb-4">
                f2d2438 changed to using serverless functions
              </p>
              <p className="mb-4">5da9fd3 added environment name</p>
              <p className="mb-4">
                008204d attempting to use serverless computing
              </p>
              <p className="mb-4">08e70fd fixed build errors</p>
              <p className="mb-4">07e644d fixed json import warnings</p>
              <p className="mb-4">
                825bf27 fixed required props issue on contentsection
              </p>
              <p className="mb-4">
                8184424 refactored pages to use content section component
              </p>
              <p className="mb-4">
                405f6d3 cleared &gt;p&lt; warning from logs, attempted to
                resolve the audit error
              </p>
              <p className="mb-4">
                ad85495 updated tests, over 80% coverage now!
              </p>
              <p className="mb-4">f52c274 cleaned up some console logs</p>
              <p className="mb-4">637bccc completed test for useFishingData</p>
              <p className="mb-4">
                a234185 refactored and improved what to fish test
              </p>
              <p className="mb-4">0f60edd ran lintfix</p>
              <p className="mb-4">
                12d3a2d updated what to fish test for more coverage
              </p>
              <p className="mb-4">
                aaf2c6e updated can-i-fish test to 100% coverage
              </p>
              <p className="mb-4">13b414c updated readme</p>
              <p className="mb-4">2dcb533 trying to fix the jest action</p>
              <p className="mb-4">4707190 slight tweaks to jest</p>
              <p className="mb-4">
                4be22ac fixed can i fish app, updated some date stuff
              </p>
              <p className="mb-4">9534db6 added current vs forecast toggle</p>
              <p className="mb-4">
                25ce8b1 added working test for what to fish, added stub for what
                to make
              </p>
              <p className="mb-4">8e3041f wrote test for can i fish page</p>
              <p className="mb-4">2cc6730 updated oilprices test</p>
              <p className="mb-4">b919563 added working oil prices test</p>
              <p className="mb-4">
                4dfcc03 fixed one cpd issue, fixed saltwater regulations
                rendering
              </p>
              <p className="mb-4">3fa681c added jscpd</p>
              <p className="mb-4">
                95b6546 some refactoring of code, added tackle grouped by
                species
              </p>
              <p className="mb-4">f0aa5c2 ran lintfix</p>
              <p className="mb-4">99a0d33 added pot roast</p>
              <p className="mb-4">
                cbea619 added missing recipes, updated style linting, added more
                species to list
              </p>
              <p className="mb-4">4716ef3 fixed loader imports</p>
              <p className="mb-4">44db07c added loader test</p>
              <p className="mb-4">6b7bbe7 loaded state from weather</p>
              <p className="mb-4">8853867 fixed default display</p>
              <p className="mb-4">
                d16f113 fixed tacklebox icon height, updated state-based inputs
              </p>
              <p className="mb-4">7872906 added loader</p>
              <p className="mb-4">
                84e486f added recommended species to target
              </p>
              <p className="mb-4">
                15f95df added state dropdown for determining proper spawn
                seasons per state
              </p>
              <p className="mb-4">60b7990 fixed ts errors</p>
              <p className="mb-4">
                c62f5d7 fixed some jest tests,added new test for date, fixed
                some typescript errors
              </p>
              <p className="mb-4">
                e73cf0c added location text to what to fish app
              </p>
              <p className="mb-4">
                3d337fe ran lintfix, added not supported text
              </p>
              <p className="mb-4">4a9fa85 slight tweak to global padding</p>
              <p className="mb-4">8816cc8 added copy button for ingredients</p>
              <p className="mb-4">9e2da5f adjusted some styles</p>
              <p className="mb-4">
                4806394 fixed homepage format, using state and binding for what
                to fish app with zip code
              </p>
              <p className="mb-4">
                e24a9cf converted json files to js files with exports
              </p>
              <p className="mb-4">
                6f089cf switched to jest and added test coverage
              </p>
              <p className="mb-4">b75bdf2 ran lintfix and updated cspell</p>
              <p className="mb-4">
                4944c1d restructured folders, added cypress tests
              </p>
              <p className="mb-4">9d96a6b fixed spelling errors</p>
              <p className="mb-4">6a7c78f fixed dates on saltwater grid</p>
              <p className="mb-4">
                3103e30 fixed js lint error, removed duplicate text from can i
                fish, updated nav with organization
              </p>
              <p className="mb-4">
                10b4d5c fixed mobile display of fishing regulations grid
              </p>
              <p className="mb-4">
                eb3ed22 fixed saltwater regulations, updated display on the can
                i fish page
              </p>
              <p className="mb-4">e65bc74 added plugin:jsx-a11y</p>
              <p className="mb-4">ff111e8 resolved color contrast issues</p>
              <p className="mb-4">ebb3577 added can i fish app</p>
              <p className="mb-4">b7eb102 ran lintfix</p>
              <p className="mb-4">6d9ab94 added no-cache</p>
              <p className="mb-4">
                843ab53 removed style linting from github actions, fixed
                pipeline errors
              </p>
              <p className="mb-4">
                6b424ea fixed what to make page, fixed some errors from pipeline
              </p>
              <p className="mb-4">
                a91cfc3 remove npm cache from github main action
              </p>
              <p className="mb-4">
                370dbd6 added cspell, ignore engines in github actions
              </p>
              <p className="mb-4">96f5d64 Create main.yml</p>
              <p className="mb-4">
                a5d939a added cspell config, updated layout and styles
              </p>
              <p className="mb-4">
                b971051 updated prettier and eslint configs
              </p>
              <p className="mb-4">4c0a839 added icon</p>
              <p className="mb-4">1c4c802 removed .next directory</p>
              <p className="mb-4">a52e709 added server and oil prices app</p>
              <p className="mb-4">
                d0b8e99 base setup complete, what to fish app is working
              </p>
              <p className="mb-4">
                8536be7 Initial commit from Create Next App
              </p>
            </div>
          }
        ></ContentSection>
      </div>
    </div>
  )
}
