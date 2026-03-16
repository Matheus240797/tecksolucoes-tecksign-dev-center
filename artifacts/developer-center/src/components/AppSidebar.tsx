import React from 'react';
import { Link, useLocation } from 'wouter';
import { Book, Code, Key, FileText, Send, Activity, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  badge?: string;
  children?: NavItem[];
}

const navConfig: NavItem[] = [
  {
    title: 'Overview',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Getting Started',
    href: '/getting-started',
    icon: Book,
  },
  {
    title: 'Authentication',
    href: '/authentication',
    icon: Key,
  },
  {
    title: 'Endpoints',
    href: '/endpoints',
    icon: Send,
    children: [
      { title: 'Geração de Processo', href: '/endpoints/create-process' },
      { title: 'Consulta de Processo', href: '/endpoints/get-process' },
      { title: 'Consulta de Documentos', href: '/endpoints/get-documents' },
    ]
  },
  {
    title: 'API Reference',
    href: '/api-reference',
    icon: Code,
    badge: 'Swagger'
  }
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-72 bg-card border-r border-border h-screen flex flex-col fixed top-0 left-0 z-40">
      <div className="h-20 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Teck Sign Logo" className="h-8 w-8 object-contain" />
          <span className="font-display text-xl text-foreground tracking-tight">Teck Sign</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-8">
          {navConfig.map((item, index) => (
            <div key={index} className="space-y-3">
              {item.children ? (
                <div>
                  <div className="flex items-center gap-2 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.title}
                  </div>
                  <div className="space-y-1 border-l border-border ml-4 pl-4">
                    {item.children.map(child => {
                      const isActive = location === child.href;
                      return (
                        <Link 
                          key={child.href} 
                          href={child.href}
                          className={cn(
                            "block py-2 px-3 text-sm transition-colors",
                            isActive 
                              ? "text-primary bg-primary/10 border-l-2 border-primary -ml-[17px] pl-[18px] font-medium" 
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          )}
                        >
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-2 py-2 text-sm font-semibold transition-colors",
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2 uppercase tracking-wider">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.title}
                  </div>
                  {item.badge && (
                    <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-sm border border-primary/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="bg-secondary p-4 flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
