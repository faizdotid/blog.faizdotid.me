// Site-wide configuration. Edit values here to update the whole site.

export const SITE_TITLE = "faizdotid";
export const SITE_DESCRIPTION =
  "I write about tech and whatever I'm figuring out.";

/** <title> for the home page only. Other pages use their own page name. */
export const HOME_TITLE = "blog - faizdotid.me";

/** Contact email (used in the footer and the email social link). */
export const EMAIL = "hi@faizdotid.me";

/** Primary navigation shown in the header. */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

/** Social / contact links. `icon` must match a key in SocialIcon.astro. */
export const SOCIAL_LINKS = [
  { href: "https://github.com/faizdotid", label: "GitHub", icon: "github" },
  { href: `mailto:${EMAIL}`, label: "Email", icon: "email" },
] as const;

export type SocialIconName = (typeof SOCIAL_LINKS)[number]["icon"];
