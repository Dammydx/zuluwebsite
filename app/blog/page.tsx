'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    category: 'The Future of Local Markets',
    title: "How Technology Is Saving Nigeria's Local Market Culture",
    excerpt:
      'Exploring how digital platforms are preserving and enhancing traditional market experiences while bringing them into the modern age.',
    author: 'Zolu Editorial Team',
    readTime: '5 min read',
    image:
      'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    category: 'Community Success Stories',
    title: '5 Ways Zolu Vendors Are Winning in the Digital Age',
    excerpt:
      "Real stories from local vendors who've transformed their businesses through Zolu's digital marketplace platform.",
    author: 'Community Team',
    readTime: '4 min read',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    category: 'Zolu Updates',
    title: 'From Village Farms to Digital Shelves — The Zolu Story',
    excerpt:
      "The journey of how we're connecting Nigerian farmers and producers directly to consumers across the nation.",
    author: 'Zolu Editorial Team',
    readTime: '6 min read',
    image:
      'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    category: 'Agro & Tech Insights',
    title: "Understanding Nigeria's Agro Supply Chain Revolution",
    excerpt:
      'A deep dive into how technology is streamlining agricultural distribution and reducing food waste in Nigeria.',
    author: 'Tech Insights',
    readTime: '7 min read',
    image:
      'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    category: 'Behind the Market Rush',
    title: 'Market Rush 2025: What to Expect',
    excerpt:
      "Get ready for Nigeria's biggest digital marketplace campaign with exclusive deals and community events.",
    author: 'Marketing Team',
    readTime: '3 min read',
    image:
      'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    category: 'The Future of Local Markets',
    title: 'Building Trust in Digital Commerce: The Zolu Approach',
    excerpt:
      "How we're ensuring authenticity, security, and transparency in every transaction on our platform.",
    author: 'Security Team',
    readTime: '5 min read',
    image:
      'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const categories = [
  'The Future of Local Markets',
  'Behind the Market Rush',
  'Agro & Tech Insights',
  'Community Success Stories',
  'Zolu Updates',
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">Zolu Journal</h1>
          <p className="text-xl text-gray-600">
            Stories, insights, and updates from Nigeria&apos;s digital marketplace
            revolution
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="cursor-pointer border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="group h-full cursor-pointer overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                      {post.category}
                    </Badge>
                    <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 group-hover:text-emerald-600">
                      {post.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>• {post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
