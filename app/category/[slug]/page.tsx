
import { redirect } from 'next/navigation';

export default async function CategoryRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    redirect(`/category/${slug}/page/1`);
}
