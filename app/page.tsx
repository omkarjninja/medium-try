import Posts from '@/components/posts'
import RecentPosts from '@/components/recent-posts'
import WhoToFollow from '@/components/who-to-follow'
import RecommendedTopics from '@/components/recommended-topics'

export default function Home() {
  return (
    <section className='mt-[65px]'>
      <div className='container'>
        <div className='flex flex-col gap-x-16 gap-y-6 xl:flex-row xl:items-start'>
          <main className='flex-1 pt-20 xl:py-20'>
            <Posts />
          </main>

          <aside className='flex w-full flex-col justify-between gap-6 pb-10 md:flex-row xl:sticky xl:top-[65px] xl:w-[350px] xl:flex-col xl:py-20'>
            <RecentPosts />
            <RecommendedTopics />
            {/* <WhoToFollow /> */}
          </aside>
        </div>
      </div>
    </section>
  )
}
