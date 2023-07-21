'use client'

import ContentSection from '@/app/components/content'
import Breadcrumbs from '@/app/components/breadcrumbs'
import { getSeasons } from '@/app/helpers/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

function getRecommendedCareForDate() {
  let seasons = getSeasons()
  let recommendation: string[] = []

  if (seasons.includes('winter')) {
    recommendation.push('Enjoy the time off!')
  } else if (seasons.includes('spring')) {
    if (!seasons.includes('summer')) {
      recommendation.push('overseed', 'dethatch', 'apply spring fertilizer')
    } else {
      recommendation.push(
        'apply spring fertilizer second time',
        'apply grub killer'
      )
    }

    recommendation.push(
      'spray weeds as needed',
      'apply weed preventer as needed',
      'water lawn every 3-5 days, except on rainy days, before sunrise'
    )
  } else if (seasons.includes('summer')) {
    if (!seasons.includes('fall')) {
      recommendation.push(
        'apply spring fertilizer final time',
        'water grass every 2 days, daily during heat waves, before sunrise'
      )
    }

    recommendation.push(
      'spray weeds as needed',
      'apply weed preventer as needed'
    )
  } else if (seasons.includes('fall')) {
    if (!seasons.includes('winter')) {
      recommendation.push(
        'apply fall fertilizer',
        'water lawn every 3-5 days, except on rainy days, before sunrise',
        'overseed'
      )
    }
  }

  return recommendation
}

function getLawnCareTip() {
  const tips = [
    "If you had crabgrass last year, you're going to have crabgrass this year. Make sure you work to prevent it.",
    'Pulling weeds makes for a pretty lawn, but you leave holes everywhere for new weeds to sprout from.',
    'The best defense against weeds is a healthy, full lawn.',
    'Pay attention to how your lawn looks throughout the year, and make adjustments to your routine as necessary. Make sure to journal your changes so you repeat the process next year.',
    'Crabgrass loves hot, dry weather. You will see crabgrass affecting the sunniest parts of your lawn.',
    'Water your lawn before sunrise or after sunset. This gives the lawn enough time to soak up all of the water before the sun gets the chance to dry it out.',
    'You will notice that the shady areas tend to get far less weeds. Water the sunnier parts of your lawn more often than the shady spots.',
    'Unless you see lots of weeds, crabgrass with seeds growing, or some kind of disease on the grass, keep the bagger off and mulch the grass.',
    'Mushrooms are a sign of a healthy lawn, but they may also be a sign of overwatering.',
  ]

  const today = new Date()
  let tipIndex = 0

  if (today.getDate() > tips.length) {
    tipIndex = today.getDate() - Math.trunc(today.getDate() / 10) * 10
  } else {
    tipIndex = today.getDate()
  }

  while (tipIndex >= tips.length) {
    tipIndex--
  }

  return tips[tipIndex]
}

export default function LawnCare() {
  let breadcrumbs = [
    {
      title: 'Home Maintenance',
      href: '/home-maintenance',
    },
    {
      title: 'Lawn Care',
      href: '/home-maintenance/lawn-care',
    },
  ]
  const recommendations = getRecommendedCareForDate()

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">Lawn Care</h1>
        <hr className="mb-4" />
        <p className="mb-4">
          This generally recommends what to do this month for your lawn care.
          This is based on a northern lawn that receives all four seasons.
        </p>

        <div>
          <ContentSection
            title="What to do this month"
            content={recommendations.map((r) => (
              <div
                className="flex flex-row items-center justify-between space-x-2 mb-4 last:mb-0"
                key={r}
              >
                <div className="basis-3/4 break-all">{r}</div>
                {(r.includes('fertilizer') || r.includes('weed preventer')) && (
                  <div>
                    <a
                      title={
                        'Amazon Buy link for Greenview ' +
                        (r.includes('fertilizer')
                          ? 'fertilizer'
                          : 'weed killer')
                      }
                      target="_blank"
                      className="p-2 block w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
                      href={
                        'https://www.amazon.com/gp/search?ie=UTF8&tag=bearededfisha-20&linkCode=ur2&linkId=9b3fecfa6e628523da72d3db87d3cd35&camp=1789&creative=9325&index=aps&keywords=greenview ' +
                        (r.includes('fertilizer')
                          ? 'fertilizer'
                          : 'weed killer')
                      }
                    >
                      <span>Buy</span>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="ml-2 max-h-4"
                      />
                    </a>
                  </div>
                )}
              </div>
            ))}
            isExpandedByDefault={true}
          ></ContentSection>
        </div>

        <div>
          <ContentSection
            title="Tip of the Day"
            content={getLawnCareTip()}
            isExpandedByDefault={true}
          ></ContentSection>
        </div>
      </div>
    </div>
  )
}
