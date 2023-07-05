import Image from 'next/image'
import selfie from '@/app/assets/images/selfie.jpg'
import Breadcrumbs from '@/app/components/breadcrumbs'

export default function About() {
  let breadcrumbs = [
    {
      title: 'About',
      href: '/about',
    },
  ]
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">About Tacklebox</h1>
        <hr className="mb-4" />
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-8">
          <div>
            <p className="mb-4">
              This started off as a little project to help my ADHD. I was
              struggling to remember to put all the groceries on the shopping
              list that I needed for the week, or having a hard time deciding
              which lure and lure color to fish with that day. What this turned
              into is an extension of my mentality where tasks that can be
              automated to simplify a person&apos;s life can and should be.
            </p>

            <p className="mb-4">
              I have been a web developer for 10+ years working with different
              frameworks, methodologies, and tools, including but not limited to
              Java, PHP, React, Vue, Node, Git, CICD, and Typescript. I am fond
              of and very much enjoy working with Javascript frameworks and
              generally in the web development space, as the instant
              gratification of seeing your code update after a web page refresh
              never gets old.
            </p>

            <p className="mb-4">
              I am also an avid fisherman, a family man, and a gamer. I love to
              relax, have fun, and generally make things easier for everyone
              around me as much as I can. Whether that takes the form of me
              taking on additional responsibilities, lending an ear to someone
              who just needs a person to listen to them, or writing some code to
              enable someone to do their job more efficiently, I am there.
            </p>

            <p className="mb-4">Keep doing you.</p>

            <p className="mb-4"> - Andrew Augusto</p>
          </div>
          <div>
            <Image
              src={selfie}
              alt="Selfie of myself, Andrew Augusto, fishing on a rainy day in fishing waders"
              width="2464"
              height="3280"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
