import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'

async function createServer() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
  })

  if (!isProd) {
    // DEV — use Vite middleware
    const { createServer: createViteServer } = await import('vite')
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    app.use(vite.middlewares)

    const ssrRoutes = ['/', '/about', '/marketplace', '/marketplace/products']

    ssrRoutes.forEach(route => {
      app.get(route, async (req, res, next) => {
        try {
          let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
          template = await vite.transformIndexHtml(req.url, template)
          const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
          const appHtml = render(req.url)
          const html = template.replace(`<!--ssr-outlet-->`, appHtml)
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
          vite.ssrFixStacktrace(e as Error)
          next(e)
        }
      })
    })

    // Client-rendered routes in dev
    const clientRoutes = ['/supplier', '/supplier/*all', '/sign-up', '/sign-in']
    clientRoutes.forEach(route => {
      app.get(route, async (req, res) => {
        try {
          let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
          template = await vite.transformIndexHtml(req.url, template)
          const html = template.replace(`<!--ssr-outlet-->`, '<div id="root"></div>')
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e: any) {
          res.status(500).end(e.message)
        }
      })
    })

  } else {
    // PRODUCTION — serve built files
    const distClient = path.resolve(__dirname, '../client')
    const distServer = path.resolve(__dirname, '../server')

    app.use(express.static(distClient))

    const ssrRoutes = ['/', '/about', '/marketplace', '/marketplace/products']

    ssrRoutes.forEach(route => {
      app.get(route, async (req, res) => {
        try {
          const template = fs.readFileSync(path.resolve(distClient, 'index.html'), 'utf-8')
          const { render } = await import(path.resolve(distServer, 'entry-server.js'))
          const appHtml = render(req.url)
          const html = template.replace(`<!--ssr-outlet-->`, appHtml)
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e: any) {
          res.status(500).end(e.message)
        }
      })
    })

    // Client-rendered routes in production
    app.get(['/supplier', '/supplier/*all', '/sign-up', '/sign-in'], (req, res) => {
      res.sendFile(path.resolve(distClient, 'index.html'))
    })
  }

  const PORT = process.env.PORT || 5173
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
  })
}

createServer()