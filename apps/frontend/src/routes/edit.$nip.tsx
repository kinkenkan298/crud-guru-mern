import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/$nip')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit/$nip"!</div>
}
