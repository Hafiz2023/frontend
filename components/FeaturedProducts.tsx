'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

interface Product {
    id: number;
    title: string;
    category: string;
    image: string;
    slug: string;
    price: number;
}

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                // Fetch recent 4 products
                const res = await fetch('http://127.0.0.1:5000/api/public/products?limit=4');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            } finally {
                setLoading(false);
            }
        }
        fetchFeatured();
    }, []);

    if (!loading && products.length === 0) return null;

    return (
        <section className="bg-[#111] py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">New Arrivals</h2>
                    <div className="w-24 h-1 bg-[#c9a14a] mx-auto"></div>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Check out our latest premium labeling solutions added to our collection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="transform transition duration-500 hover:scale-105">
                            <ProductCard
                                {...{
                                    title: product.title,
                                    category: product.category,
                                    imageSrc: product.image,
                                    slug: product.slug
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
