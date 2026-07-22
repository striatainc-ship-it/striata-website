import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

/**
 * The route table, driven by whatever components it is handed.
 *
 * The client passes React.lazy wrappers so each route stays a separate chunk;
 * the prerenderer passes the already-imported components, so nothing suspends
 * and every page renders inline as static HTML instead of as a deferred
 * Suspense boundary. One table here means the two can't drift apart.
 *
 * The <Suspense> stays on both sides even though the server never needs it —
 * hydration compares tree shape, so an extra boundary on the client alone
 * would make React discard the prerendered markup and re-render from scratch.
 */
export default function AppRoutes({ components }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1628]" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {Object.keys(components).map(path => {
          const Component = components[path]
          return <Route key={path} path={path} element={<Component />} />
        })}
      </Routes>
    </Suspense>
  )
}
