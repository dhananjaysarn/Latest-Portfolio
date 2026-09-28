import { useEffect } from 'react'
import { env } from '../config/env'

interface PageMetadata {
  title: string
  description: string
  path: string
}

function setMeta(name: string, content: string): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.append(tag)
  }
  tag.content = content
}

function setProperty(property: string, content: string): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.append(tag)
  }
  tag.content = content
}

export function usePageMetadata({ title, description, path }: PageMetadata): void {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setProperty('og:type', 'website')
    setProperty('og:title', title)
    setProperty('og:description', description)

    if (env.siteUrl) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = new URL(path, env.siteUrl).href
    }
  }, [description, path, title])
}
