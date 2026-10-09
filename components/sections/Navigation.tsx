"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { useLenis } from "@/components/motion/SmoothScroll";
import styles from "./Navigation.module.css";

export function Navigation() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="AURA — home">
          <Wordmark aria-hidden="true" title="" className={styles.wordmark} />
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.href === "/work" && (
                    <sup className={styles.count}>
                      <span className="sr-only">(</span>
                      {String(projects.length).padStart(2, "0")}
                      <span className="sr-only"> projects)</span>
                    </sup>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <SoundToggle />
          {pathname !== site.primaryCta.href && (
            <Button href={site.primaryCta.href} track="book_call_click" className={styles.cta}>
              Book a call
            </Button>
          )}
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.toggleLabel}>{open ? "Close" : "Menu"}</span>
            <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${styles.menu} ${open ? styles.menuOpen : ""}`} hidden={!open}>
        <nav aria-label="Mobile" className="container">
          <ul className={styles.menuList}>
            {[{ label: "Home", href: "/" }, ...site.nav, { label: "Contact", href: "/contact" }].map((item, i) => (
              <li key={item.href} style={{ transitionDelay: `${0.05 + i * 0.04}s` }}>
                <Link
                  href={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  className={styles.menuLink}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.menuFoot}>
            <Button href={site.primaryCta.href} track="book_call_click">
              {site.primaryCta.label}
            </Button>
            <a href={`mailto:${site.email}`} className="t-small">
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
