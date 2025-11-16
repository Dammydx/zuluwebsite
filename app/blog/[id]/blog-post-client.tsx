'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const blogData: Record<
  string,
  { title: string; content: string; author: string; date: string; image: string }
> = {
  '1': {
    title: "How Technology Is Saving Nigeria's Local Market Culture",
    content:
      "Digital platforms are revolutionizing how traditional markets operate in Nigeria. By connecting vendors directly with customers through mobile technology, we're preserving the authentic market experience while adding modern convenience. Vendors can now reach customers beyond their physical location, maintain digital records, and access financial services that were previously unavailable. This transformation is helping to preserve local market culture while preparing it for the future.",
    author: 'Zolu Editorial Team',
    date: 'January 15, 2025',
    image:
      'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  '2': {
    title: '5 Ways Zolu Vendors Are Winning in the Digital Age',
    content:
      "Local vendors across Nigeria are experiencing unprecedented growth through Zolu's platform. From increased visibility to streamlined operations, these success stories showcase the real impact of digital transformation on traditional businesses. Vendors report higher sales, better customer relationships, and improved inventory management. The platform has enabled them to compete effectively in the modern marketplace while maintaining their personal touch.",
    author: 'Community Team',
    date: 'January 10, 2025',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  '3': {
    title: 'From Village Farms to Digital Shelves — The Zolu Story',
    content:
      "Zolu's journey began with a simple mission: connect Nigerian farmers directly to consumers. Today, we've created a thriving ecosystem that benefits everyone involved. Farmers get fair prices, consumers get fresh products, and the entire supply chain becomes more efficient. Our platform eliminates unnecessary middlemen while maintaining quality and authenticity at every step.",
    author: 'Zolu Editorial Team',
    date: 'January 5, 2025',
    image:
      'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  '4': {
    title: "Understanding Nigeria's Agro Supply Chain Revolution",
    content:
      "Technology is transforming Nigeria's agricultural supply chain, reducing waste and improving efficiency at every stage. From farm to market, digital tools are helping stakeholders make better decisions, track inventory in real-time, and ensure quality control. This revolution is making Nigerian agriculture more competitive and sustainable for the future.",
    author: 'Tech Insights',
    date: 'December 28, 2024',
    image:
      'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  '5': {
    title: 'Market Rush 2025: What to Expect',
    content:
      "Get ready for the biggest shopping event of the year! Market Rush 2025 brings exclusive deals, special offers, and community events that celebrate Nigerian commerce. Vendors are preparing amazing discounts, and customers can look forward to incredible savings on their favorite products. Stay tuned for more updates as we approach the big day.",
    author: 'Marketing Team',
    date: 'December 20, 2024',
    image:
      'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  '6': {
    title: 'Building Trust in Digital Commerce: The Zolu Approach',
    content:
      "Trust is the foundation of any successful marketplace. At Zolu, we've implemented multiple layers of verification, secure payment systems, and transparent rating mechanisms to ensure every transaction is safe. Our commitment to authenticity means customers can shop with confidence, knowing every vendor has been verified and every product meets our quality standards.",
    author: 'Security Team',
    date: 'December 15, 2024',
    image:
      'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
};

export default function BlogPostClient({ id }: { id: string }) {
  const router = useRouter();
  const post = blogData[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Article not found</h1>
            <Button onClick={() => router.push('/blog')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Button variant="ghost" onClick={() => router.push('/blog')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <article>
          <div className="mb-8 aspect-video overflow-hidden rounded-lg">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-900">{post.title}</h1>

          <div className="mb-8 flex items-center text-gray-600">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-12">
          <Button onClick={() => router.push('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
