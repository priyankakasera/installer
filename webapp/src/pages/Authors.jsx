import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'

const authors = [
  {
    name: 'DevTools Team',
    role: 'Core Maintainers',
    bio: 'A group of passionate developers who got tired of spending hours configuring new machines. We built DevTools Installer to solve that problem once and for all.',
    avatar: null,
    links: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
]

const contributors = [
  'Community contributors welcome!  Fork the repo on GitHub and submit a pull request.',
]

export default function Authors() {
  return (
    <>
      <SEO
        title="About the Team — DevTools Installer | Meet the Authors & Contributors"
        description="Meet the team behind DevTools Installer — the free one-click developer tool setup for Windows. Learn about our mission and how to contribute."
        keywords="DevTools Installer team, DevTools Installer authors, developer tools contributors, open source developer tools"
        path="/authors"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Authors', url: '/authors' },
        ])}
      />

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">About the Team</h1>
          <p className="text-lg text-gray-400">
            Meet the people behind DevTools Installer.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {authors.map((a) => (
            <div
              key={a.name}
              className="bg-dark-card border border-dark-border rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Avatar */}
              <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {a.avatar ? (
                  <img src={a.avatar} alt={a.name} className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  a.name.split(' ').map((w) => w[0]).join('')
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{a.name}</h3>
                <p className="text-sm text-primary-light mb-3">{a.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{a.bio}</p>
                <div className="flex gap-3">
                  {a.links.github && (
                    <a
                      href={a.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="GitHub"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}
                  {a.links.twitter && (
                    <a
                      href={a.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="w-4 h-4" />
                    </a>
                  )}
                  {a.links.linkedin && (
                    <a
                      href={a.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-10 bg-dark-card border border-dark-border rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-4">Contributors</h3>
            {contributors.map((c, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed">{c}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
