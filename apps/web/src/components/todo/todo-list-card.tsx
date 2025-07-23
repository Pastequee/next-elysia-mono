import { LoggedIn, LoggedOut } from '~/components/auth'
import { Card, CardContent, Separator } from '~/components/ui'
import { getSession } from '~/lib/actions/get-session'

import { AddTodoForm } from './add-todo-form'
import { TodoList } from './todo-list'

export const TodoListCard = async () => {
  const session = await getSession()

  return (
    <Card className="mx-auto w-[90vw] max-w-md">
      <CardContent className="flex flex-col gap-4">
        <LoggedOut>
          <h1 className="text-center text-xl">
            You must be logged in to add a todo
          </h1>
        </LoggedOut>
        <AddTodoForm disabled={!session} />
        <LoggedIn>
          <Separator className="last:hidden" />
          <TodoList />
        </LoggedIn>
      </CardContent>
    </Card>
  )
}
