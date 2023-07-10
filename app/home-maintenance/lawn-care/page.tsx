'use client'

import ContentSection from '@/app/components/content'
import Breadcrumbs from '@/app/components/breadcrumbs'
import { getSeasons } from '@/app/helpers/date'

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

  console.log(recommendation)

  return recommendation
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

        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            <ContentSection
              title="What to do this month"
              content={recommendations.map((r) => (
                <p className="mb-4 last:mb-0" key={r}>
                  {r}
                </p>
              ))}
              isExpandedByDefault={true}
            ></ContentSection>
          </div>
        </div>
      </div>
    </div>
  )
}
