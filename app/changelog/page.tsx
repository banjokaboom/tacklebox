/**
 * To generate changelogs
 *
 * git log --oneline --decorate=no HEAD...{previous tag} > changelogs/{new tag}.txt
 */

import ContentSection from '@/app/components/content'
import Breadcrumbs from '@/app/components/breadcrumbs'

export default function ChangeLog() {
  let breadcrumbs = [
    {
      title: 'Changelog',
      href: '/changelog',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">Changelog</h1>
        <hr className="mb-4" />
        <ContentSection
          title="v2.0.0"
          content={
            <div>
              <p className="mb-4">
                changed recipes and tackle to use postgres database
              </p>
              <p className="mb-4">
                implemented router with new directory structure
              </p>
              <p className="mb-4">fixed minimum length on can i fish</p>
              <p className="mb-4">added tip about noisy lures</p>
              <p className="mb-4">
                added trout stocking seasons for northern states
              </p>
              <p className="mb-4">
                fixed display of species names under lures, fixed trout to not
                show up in summer
              </p>
            </div>
          }
          isExpandedByDefault={true}
        ></ContentSection>
        <ContentSection
          title="v1.0.53"
          content={
            <div>
              <p className="mb-4">added yahtzee mechanic for recipes</p>
              <p className="mb-4">fixed bait issue for carp</p>
              <p className="mb-4">added free line rig</p>
              <p className="mb-4">fixed useFishingData bug with still check</p>
              <p className="mb-4">
                fixed bug with carp only rig not displaying
              </p>
              <p className="mb-4">added carp and catfish data</p>
              <p className="mb-4">
                slight tweak to the best times to fish logic
              </p>
              <p className="mb-4">updated inline link styles</p>
              <p className="mb-4">renamed oil prices to heating oil prices</p>
              <p className="mb-4">
                fixed some formatting issues on the canifish app
              </p>
            </div>
          }
        ></ContentSection>
        <ContentSection
          title="v1.0.30"
          content={
            <div>
              <p className="mb-4">added changelogs</p>
              <p className="mb-4">changed nav to footer, updated home page</p>
              <p className="mb-4">updated message styles</p>
              <p className="mb-4">
                changed messages to use fixed instead of absolute
              </p>
              <p className="mb-4">fixed a few small bugs</p>
              <p className="mb-4">
                slight tweak to hide message on initial page load, added in
                message component
              </p>
              <p className="mb-4">added message component</p>
              <p className="mb-4">sorted tackle by confidence level</p>
              <p className="mb-4">set a static tip based on the date</p>
              <p className="mb-4">
                updated oil prices to choose a random number to start
              </p>
              <p className="mb-4">added expand collapse to content sections</p>
              <p className="mb-4">fixed season overlap for lure colors</p>
              <p className="mb-4">slight tweak to how the tip renders</p>
              <p className="mb-4">
                added analytics, fixed some spelling issues
              </p>
              <p className="mb-4">
                added zones and added fishing tips to what to fish
              </p>
              <p className="mb-4">fixed regulations display</p>
              <p className="mb-4">updated readme</p>
              <p className="mb-4">added loader for geolocation</p>
              <p className="mb-4">updated default view of what to fish</p>
              <p className="mb-4">added geolocation</p>
              <p className="mb-4">updated nav, added about us</p>
            </div>
          }
        ></ContentSection>
        <ContentSection
          title="v1.0.0"
          content={
            <div>
              <p className="mb-4">added weather serverless function</p>
              <p className="mb-4">changed to using serverless functions</p>
              <p className="mb-4">added environment name</p>
              <p className="mb-4">
                refactored pages to use content section component
              </p>
              <p className="mb-4">
                updated what to fish test for more coverage
              </p>
              <p className="mb-4">updated readme</p>
              <p className="mb-4">
                fixed can i fish app, updated some date stuff
              </p>
              <p className="mb-4">added current vs forecast toggle</p>
              <p className="mb-4">fixed saltwater regulations rendering</p>
              <p className="mb-4">added pot roast</p>
              <p className="mb-4">
                added missing recipes, updated style linting, added more to list
              </p>
              <p className="mb-4">loaded state from weather</p>
              <p className="mb-4">fixed default display</p>
              <p className="mb-4">
                fixed tacklebox icon height, updated state-based inputs
              </p>
              <p className="mb-4">added loader</p>
              <p className="mb-4">added recommended species to target</p>
              <p className="mb-4">
                added state dropdown for determining proper spawn per state
              </p>
              <p className="mb-4">added location text to what to fish app</p>
              <p className="mb-4">slight tweak to global padding</p>
              <p className="mb-4">added copy button for ingredients</p>
              <p className="mb-4">adjusted some styles</p>
              <p className="mb-4">
                fixed homepage format, using state and binding for what to fish
                app with zip code
              </p>
              <p className="mb-4">
                converted json files to js files with exports
              </p>
              <p className="mb-4">fixed dates on saltwater grid</p>
              <p className="mb-4">
                removed duplicate text from can i fish, updated nav with
                organization
              </p>
              <p className="mb-4">
                fixed mobile display of fishing regulations grid
              </p>
              <p className="mb-4">
                fixed saltwater regulations, updated display on the can i fish
                page
              </p>
              <p className="mb-4">added plugin:jsx-a11y</p>
              <p className="mb-4">resolved color contrast issues</p>
              <p className="mb-4">added can i fish app</p>
              <p className="mb-4">added no-cache</p>
              <p className="mb-4">
                removed style linting from github actions, fixed pipeline errors
              </p>
              <p className="mb-4">
                fixed what to make page, fixed some errors from pipeline
              </p>
              <p className="mb-4">Create main.yml</p>
              <p className="mb-4">
                added cspell config, updated layout and styles
              </p>
              <p className="mb-4">updated prettier and eslint configs</p>
              <p className="mb-4">added icon</p>
              <p className="mb-4">removed .next directory</p>
              <p className="mb-4">added server and oil prices app</p>
              <p className="mb-4">
                base setup complete, what to fish app is working
              </p>
              <p className="mb-4">Initial commit from Create Next App</p>
            </div>
          }
        ></ContentSection>
      </div>
    </div>
  )
}
