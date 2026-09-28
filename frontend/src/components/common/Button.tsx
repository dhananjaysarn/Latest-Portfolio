import { ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
  icon?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function ActionLink({ children, variant = 'primary', icon = false, className = '', ...props }: ButtonProps) {
  return (
    <a className={`button button--${variant} ${className}`} {...props}>
      {children}
      {icon && <ArrowUpRight aria-hidden="true" size={16} />}
    </a>
  )
}

type ButtonActionProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
} & ButtonHTMLAttributes<HTMLButtonElement>

export function ActionButton({ children, variant = 'secondary', className = '', ...props }: ButtonActionProps) {
  return <button className={`button button--${variant} ${className}`} {...props}>{children}</button>
}
