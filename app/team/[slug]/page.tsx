import { teamData } from '../team-data';
import TeamMemberClientPage from './client-page';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return teamData.map((member) => ({
    slug: member.slug,
  }));
}

interface TeamMemberPageProps {
  params: {
    slug: string;
  };
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = params;
  const member = teamData.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  return <TeamMemberClientPage member={member} />;
}
