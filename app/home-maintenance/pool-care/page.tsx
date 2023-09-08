'use client'

import ContentSection from '@/app/components/content'
import Breadcrumbs from '@/app/components/breadcrumbs'
import { getSeasons } from '@/app/helpers/date'

function getRecommendedCareForDate() {
  let seasons = getSeasons()
  let recommendation: string[] = []

  if (seasons.includes('summer')) {
    if (seasons.includes('spring')) {
      recommendation.push(
        'prepare the pool for opening!',
        'clean leaves from pool cover',
        'take cover off',
        'fill pool water',
        'clean out any leaves/debris in pool',
        'connect pool pump and filter',
        'open pool',
        'apply 3lbs or 3 gallons of shock',
        'apply algaecide',
        'balance chemicals'
      )
    } else if (seasons.includes('fall')) {
      recommendation.push(
        'prepare the pool for closing!',
        'clean all leaves/debris from pool',
        'add 5lbs or 5 gallons of shock',
        'apply algaecide per closing instructions'
      )
    } else {
      recommendation.push(
        'balance pool chemicals',
        'apply algaecide weekly per instructions'
      )
    }

    recommendation.push('fill chlorine tablet float')
  } else {
    recommendation.push('Enjoy the time off!')
  }

  return recommendation
}

export default function PoolCare() {
  let breadcrumbs = [
    {
      title: 'Home Maintenance',
      href: '/home-maintenance',
    },
    {
      title: 'Pool Care',
      href: '/home-maintenance/pool-care',
    },
  ]
  const recommendations = getRecommendedCareForDate()

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">Pool Care</h1>
        <hr className="mb-4" />
        <p className="mb-4">
          This generally recommends what to do this month for your pool care.
        </p>

        <div>
          <ContentSection
            title="What to do this month"
            isExpandedByDefault={true}
          >
            {recommendations.map((r) => (
              <p className="mb-4 last:mb-0" key={r}>
                {r}
              </p>
            ))}
          </ContentSection>
        </div>
      </div>
    </div>
  )
}
