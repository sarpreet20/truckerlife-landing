import { Link, useParams } from "react-router-dom";
import { FaqList, MarkdownBody } from "../blog/Markdown";
import { getPost, relatedPosts } from "../blog/posts";
import { APP_STORE_URL, IconArrow } from "../data";
import { SEO } from "../shared";
import { SEO_ROUTES } from "../seoRoutes";
import NotFoundPage from "./NotFoundPage";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFoundPage />;

  const path = `/blog/${post.slug}`;
  const related = relatedPosts(post);
  const modified = post.updated || post.date;

  return (
    <>
      <SEO path={path} {...SEO_ROUTES[path]} />
      <article>
        <header className="relative bg-coal text-chalk overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-5 md:px-8 pt-32 md:pt-36 pb-12 md:pb-16">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-faint">
              <Link to="/" className="hover:text-amber transition-colors">HOME</Link>
              <span className="text-amber">→</span>
              <Link to="/blog" className="hover:text-amber transition-colors">BLOG</Link>
              <span className="text-amber">→</span>
              <span className="text-chalk/80 uppercase">{post.category}</span>
            </nav>
            <h1 className="mt-8 font-display uppercase leading-[1.02] text-4xl sm:text-5xl md:text-6xl tracking-wide">{post.title}</h1>
            <p className="mt-6 text-dim text-lg md:text-xl leading-relaxed max-w-3xl">{post.excerpt}</p>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
              <span>By Sarpreet Singh</span>
              <span className="text-amber" aria-hidden="true">·</span>
              <time dateTime={modified}>Updated {modified}</time>
              <span className="text-amber" aria-hidden="true">·</span>
              <span>{post.readMinutes} min read</span>
            </p>
          </div>
          <div className="lanes opacity-80" aria-hidden="true" />
        </header>

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 max-w-3xl">
            <MarkdownBody markdown={post.body} />
            <FaqList faq={post.faq} />
            <p className="mt-12 text-sm text-faint leading-relaxed border-t border-line pt-6">
              Educational information for owner-operators, not tax, legal, or financial advice. Rules and rates change. Confirm filings and
              deductions with a qualified professional who knows trucking.
            </p>
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="bg-coal text-chalk p-6 md:p-7">
              <div className="font-mono text-[10px] tracking-[0.3em] text-amber">BUILT FOR THE CAB</div>
              <p className="mt-3 font-display uppercase text-2xl leading-tight tracking-wide">Know the number before you book the load.</p>
              <p className="mt-3 text-dim leading-relaxed text-[15px]">
                True rate per mile, fuel, IFTA records and expenses — made for owner-operators, not dispatchers.
              </p>
              <Link
                to="/calculator"
                className="mt-6 inline-flex items-center gap-3 bg-amber text-ink font-bold px-5 py-3 hover:bg-chalk transition-colors duration-300"
              >
                Try the free calculator
                <IconArrow className="w-4 h-4" />
              </Link>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-sm text-chalk/70 underline underline-offset-4 hover:text-amber"
              >
                Download for iOS
              </a>
            </div>

            {related.length > 0 && (
              <div className="border border-line bg-panel p-6">
                <div className="font-mono text-[10px] tracking-[0.3em] text-faint">KEEP READING</div>
                <ul className="mt-4 space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/blog/${r.slug}`} className="font-semibold text-ink leading-snug hover:text-amberdark transition-colors">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>
    </>
  );
}
