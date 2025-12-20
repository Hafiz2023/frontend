
import React from 'react';
import ProductDetailView from '@/components/ProductDetailView';

export default async function ProductPage({ params }: { params: Promise<{ productSlug: string }> }) {
    const { productSlug } = await params;
    // Note: We use the productSlug from the params. 
    // The category slug is also available in params.slug if we needed it.
    return <ProductDetailView slug={productSlug} />;
}
