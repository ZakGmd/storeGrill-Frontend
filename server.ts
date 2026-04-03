import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
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
    const distClient = path.resolve(__dirname, 'dist/client')
    const distServer = path.resolve(__dirname, 'dist/server')

    console.log('Production mode — distClient:', distClient)
    console.log('Production mode — distServer:', distServer)

    // Import render ONCE at startup , and if this file is missing,
    // the server crashes loudly , that's for debuging 
    const entryServerUrl = pathToFileURL(
      path.resolve(distServer, 'entry-server.js')
    ).href
    console.log('Importing entry-server from:', entryServerUrl)
    const { render } = await import(entryServerUrl)
    console.log('entry-server.js loaded successfully')

    app.use(express.static(distClient))

    const ssrRoutes = ['/', '/about', '/marketplace', '/marketplace/products']
    ssrRoutes.forEach(route => {
      app.get(route, async (req, res) => {
        try {
          const template = fs.readFileSync(
            path.resolve(distClient, 'index.html'), 'utf-8'
          )
          const appHtml = render(req.url)
          const html = template.replace(`<!--ssr-outlet-->`, appHtml)
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e: any) {
          console.error('SSR render error on', req.url, e)
          res.status(500).end(e.message)
        }
      })
    })

    app.get(['/supplier', '/supplier/*all', '/sign-up', '/sign-in'], (req, res) => {
      res.sendFile(path.resolve(distClient, 'index.html'))
    })
  }

  const PORT = process.env.PORT || 5173
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} — isProd: ${isProd}`)
  })
}

createServer().catch(err => {
  console.error('Server failed to start:', err)
  process.exit(1)
})