import { useParams, Navigate, Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd, BASE_URL } from '../config/seo'
import toolGuides from '../config/toolGuides'

export const teamMembers = [
  {
    slug: 'vishalhulawale',
    initials: 'VH',
    avatar: '/avatars/vh.svg',
    name: 'Vishal Hulawale',
    role: 'Lead Developer & Project Creator',
    bio: 'Backend engineer with 10+ years of experience in Java and Spring Boot. Created DevTools Installer after spending too many weekends setting up development machines for his team. Responsible for the core installer engine, tool detection, and silent-install logic.',
    extendedBio: `Vishal started his software career building enterprise backends in Java and Spring Boot, working on large-scale financial services systems where environment consistency across developer machines was a constant challenge. After onboarding his fifth new team member in two years — and walking each of them through the same Java, Maven, Git, and IDE setup process — he decided there had to be a better way.

He built the first version of DevTools Installer over a weekend in early 2025 as an internal team tool. The goal was simple: one executable that could configure an entire Java development environment on Windows without a single manual step. After sharing it internally and seeing how much time it saved, he decided to open it up to the wider developer community.

Vishal now maintains the core installer engine, oversees the silent-install logic for MSI, EXE, and zip-based tools, and manages releases. He is responsible for the tool detection system that checks the Windows registry, known installation directories, and PATH before deciding whether to install or skip a tool.

Outside of DevTools Installer, Vishal contributes to several open-source Java libraries and writes about backend architecture, performance optimization, and Windows system programming.`,
    linkedin: 'https://www.linkedin.com/in/vishalhulawale',
    focusAreas: ['Java', 'Spring Boot', 'Installer Engine', 'Windows API', 'PATH Configuration'],
  },
  {
    slug: 'priyankakasera',
    initials: 'PK',
    avatar: '/avatars/pk.svg',
    name: 'Priyanka Kasera',
    role: 'Frontend & Electron Developer',
    bio: 'Full-stack developer focused on JavaScript/TypeScript, React, and Electron. Built the desktop app UI, the website, and the version-selection system. Handles Node.js, Yarn, and IDE-related tool integrations.',
    extendedBio: `Priyanka has been building web and desktop applications with JavaScript and TypeScript for over eight years. Her background spans React front-ends, Node.js APIs, and Electron desktop applications — a combination that made her a natural fit for building the DevTools Installer desktop UI and this website.

She designed and implemented the Electron-based application shell from scratch, including the sidebar navigation, the tool category grouping, the version dropdown system, and the real-time installation progress display. She also built this website using React and Vite, deployed as a static site on Firebase Hosting.

Priyanka handles integrations for the JavaScript ecosystem tools (Node.js, Yarn), IDE and editor installations (VS Code, IntelliJ IDEA, Notepad++), and API tools (Postman). She also maintains the version-selection system that allows users to choose between multiple release channels for tools like Node.js (LTS vs. Current) and Java (21, 17, 11).

She is actively interested in improving developer experience tooling, build-system performance, and the Electron ecosystem, and contributes to several open-source JavaScript projects.`,
    linkedin: 'https://www.linkedin.com/in/priyanka-kasera',
    focusAreas: ['React', 'Electron', 'TypeScript', 'Vite', 'Node.js', 'VS Code'],
  },
]

export default function AuthorProfile() {
  const { slug } = useParams()
  const member = teamMembers.find((m) => m.slug === slug)

  if (!member) return <Navigate to="/authors" replace />

  const authorGuides = toolGuides.filter(
    (g) => g.author?.slug === slug && !g.hidden,
  )

  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/authors' },
      { name: member.name, url: `/authors/${member.slug}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      url: `${BASE_URL}/authors/${member.slug}`,
      sameAs: [member.linkedin].filter(Boolean),
      worksFor: {
        '@type': 'Organization',
        name: 'DevTools Installer',
        url: BASE_URL,
      },
    },
  ]

  return (
    <>
      <SEO
        title={`${member.name} — ${member.role} | DevTools Installer`}
        description={`${member.bio} Author of ${authorGuides.length} installation guides on DevTools Installer.`}
        keywords={`${member.name}, DevTools Installer team, ${member.focusAreas.join(', ')}, developer tools contributor`}
        path={`/authors/${member.slug}`}
        jsonLd={jsonLd}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Back */}
        <Link
          to="/authors"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-light transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          All Team Members
        </Link>

        {/* Profile header */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start mb-8">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-accent object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">{member.name}</h1>
            <p className="text-primary-light text-sm mb-4">{member.role}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {member.focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-2.5 py-1 text-xs rounded-lg bg-dark-lighter border border-dark-border text-gray-400"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                aria-label={`${member.name} on LinkedIn`}
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Extended bio */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">About {member.name}</h2>
          <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
            {member.extendedBio.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Guides by this author */}
        {authorGuides.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Guides by {member.name.split(' ')[0]}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {authorGuides.map((guide) => (
                <Link
                  key={guide.id}
                  to={`/guides/${guide.id}`}
                  className="group bg-dark-card border border-dark-border rounded-xl p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <h3 className="text-white font-medium mb-1 flex items-center justify-between">
                    {guide.name}
                    <FiArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary-light group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">{guide.category}</p>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
