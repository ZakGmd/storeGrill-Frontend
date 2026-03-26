import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ssrRoutes = ['/', '/about' ,'/marketplace','/marketplace/products']


async function createServer() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
  })
  

  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

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

 app.get('/supplier', async (req, res) => {
  
  console.log("redenred a zabi m3a kerek")
  try {
    let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    template = await vite.transformIndexHtml(req.url, template)
    
    const html = template.replace(`<!--ssr-outlet-->`, '<div id="root"></div>')
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e: any) {
    res.status(500).end(e.message)
  }
  })
  app.get('/sign-up', async (req , res) =>{
    
    try{
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(req.url, template)
      const html = template.replace(`<!--ssr-outlet-->`, '<div id="root"></div>')
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

    }catch( e :any ){
      res.status(500).end(e.message)
    }
  })
  app.get('/sign-in', async (req , res) =>{
    
    try{
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(req.url, template)
      const html = template.replace(`<!--ssr-outlet-->`, '<div id="root"></div>')
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

    }catch( e :any ){
      res.status(500).end(e.message)
    }
  })
  app.get('/supplier/*all', async (req, res) => {
      console.log("Client rendering")

    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(req.url, template)
      
      const html = template.replace(`<!--ssr-outlet-->`, '<div id="root"></div>')
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      res.status(500).end(e.message)
    }
  })
  
  
 
 
 
  const PORT = process.env.PORT || 5173
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    })
}

createServer()