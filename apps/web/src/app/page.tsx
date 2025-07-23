import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { TodoListCard } from '~/components/todo/todo-list-card'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <TodoListCard />
      </main>
      <Footer />
    </div>
  )
}
