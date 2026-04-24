import GuideLayout from '../components/GuideLayout'
import { buildBreadcrumbJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

export default function WindowsPathGuide() {
  const jsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Windows PATH Variable Explained', url: '/guides/windows-path-explained' },
  ])

  return (
    <GuideLayout
      title="Windows PATH Variable Explained — Edit & Fix It (2026)"
      description="What the Windows PATH variable does, how to view and edit it on Windows 10 & 11, and the most common mistakes that cause 'command not found' errors."
      keywords="Windows PATH variable, edit PATH Windows 10, edit PATH Windows 11, environment variables Windows, add to PATH, PATH not working, command not found Windows, configure PATH developer tools"
      path="/guides/windows-path-explained"
      jsonLd={jsonLd}
    >
      <p className="text-xl text-gray-600 mb-12 leading-relaxed">
        Everything you need to know about the PATH environment variable on Windows — what it
        does, how to edit it, and why developer tools like Java, Node.js, and Python depend on it.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is the PATH Variable?</h2>
        <p>
            The <strong className="text-gray-900">PATH</strong> is a system environment variable that
            tells Windows where to look for executable programs. When you type a command like{' '}
            <code className="!text-gray-900">java --version</code> in a terminal,
            Windows searches through every directory listed in PATH until it finds a matching file.
        </p>
        <div className="bg-red-50 border-l-4 border-red-200 p-4 my-6">
            <p className="text-sm text-red-700 font-mono">
                'java' is not recognized as an internal or external command...
            </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">How to Edit PATH (Windows 11)</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Search for <strong>"Environment Variables"</strong> in the Start menu.</li>
            <li>Click <strong>"Edit the system environment variables"</strong>.</li>
            <li>Click <strong>"Environment Variables…"</strong> at the bottom.</li>
            <li>Select <strong>Path</strong> under System Variables and click <strong>Edit</strong>.</li>
            <li>Add your new directory path and click <strong>OK</strong>.</li>
        </ol>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Mistakes</h2>
        <ul className="space-y-4">
            <li>
                <strong>Adding the file, not the folder:</strong> 
                Always add the <code className="!text-gray-900">\bin</code> directory, not the <code className="!text-gray-900">.exe</code> file itself.
            </li>
            <li>
                <strong>Not restarting the terminal:</strong> 
                Changes only apply to <em>new</em> terminal windows.
            </li>
        </ul>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" />
    </GuideLayout>
  )
}
