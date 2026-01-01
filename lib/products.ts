
// Mock data source - in a real app this would be a database
const categoriesData: Record<string, string[]> = {
    'printed-tags': [
        "Hang Tags for Kids Garments", "Swing Tags In Karachi", "Clothing Labels", "Custom Printed Tags",
        "Kraft Paper Tags", "Luxury Clothing Tags", "Die Cut Hang Tags", "Folded Hang Tags",
        "PVC Hang Tags", "Fabric Labels", "Embossed Tags", "Gold Foil Tags",
        "Jeans Tags", "Shirt Tags", "Neck Labels", "Care Labels",
        "Size Stickers", "Price Tags", "Barcode Tags", "Woven Patches"
    ],
    'leather-patches': [
        "Laser Engraving Leather Jacket Patches",
        "Laser Engraving Cap Leather Patches",
        "Laser Engraving Leather Patches",
        "Cap Leather Patches",
        "Blank Leather Patch",
        "Leather Patches In Karachi"
    ],
    'woven-labels': [
        "Ribbon Satan Labels",
        "Woven Labels For Fashion Brands",
        "Woven Label Branding",
        "Custom Woven Tags",
        "Woven Label With Size",
        "Woven Labels Small Quantities",
        "Damask Woven Labels", "Satin Woven Labels" // Keep some generic ones
    ],
    'hang-tags': [
        "Luxury Hang Tags", "Folded Hang Tags", "Die Cut Hang Tags",
        "Kraft Paper Hang Tags", "Embossed Hang Tags", "Gold Foil Hang Tags",
        "Clothing Swing Tags", "Custom Shape Tags", "PVC Hang Tags",
        "Round Hang Tags", "Square Hang Tags", "Jeans Hang Tags"
    ],
    'paper-bags': [
        "Kraft Paper Bags Manufacturers In Karachi", // Fixes the 404
        "Kraft Paper Bags", "Luxury Shopping Bags", "Retail Paper Bags", "Custom Printed Paper Bags",
        "Gift Bags", "Twisted Handle Paper Bags", "Flat Handle Paper Bags", "Glossy Paper Bags"
    ],
    'lace': [
        "Print Woven Lace",
        "Print Canvas Lace",
        "Print Ribbon Satin Lace",
        "Print Lace",
        "Cotton Lace", "Nylon Lace" // Keep some generic
    ]
};

const productImages = [
    "/tag-black-gold.png",
    "/tag-kraft-minimal.png",
    "/tag-fabric-white.png",
    "/printed-tags-banner.png"
];


const customProductData: Record<string, { image: string, description: string }> = {
    // Leather Patches - Specific Images
    'laser-engraving-leather-jacket-patches': {
        image: '/LeartherTags/Jeans-Universal-jeans-leather-patch-labels.jpg',
        description: 'Premium black leather branding patch with silver foil stamping, perfect for high-end jackets.'
    },
    'laser-engraving-cap-leather-patches': {
        image: '/LeartherTags/dark-grey-leather-patch-new.jpg',
        description: 'Circular dark brown leather patch with modern embossing, tailored for caps and headwear.'
    },
    'blank-leather-patch': {
        image: '/LeartherTags/blank-leather-label-500x500-1.jpg',
        description: 'Authentic cognac leather patch with stitch detailing, ready for your custom logo.'
    },
    'laser-engraving-leather-patches': {
        image: '/LeartherTags/Synthetic-Leather-patch-with-custom-engraving.jpg',
        description: 'Precision laser-engraved leather patches available in various shapes and finishes.'
    },
    'cap-leather-patches': {
        image: '/LeartherTags/levis-leather-patch.jpg',
        description: 'Durable and stylish leather patches designed specifically for hats and beanies.'
    },
    'leather-patches-in-karachi': {
        image: '/LeartherTags/leather-patch-for-jeans-pants-3-500x500-1.jpeg',
        description: 'Leading manufacturer of custom leather patches in Karachi, offering bulk production.'
    },

    // Existing Custom Data
    'print-woven-lace': {
        image: 'https://zatraders.pk/wp-content/uploads/2024/06/Print-Canvas-Lace-500x500-1.jpg',
        description: 'We also make print woven lace in Pakistan. We are known for our product quality and reasonable prices. Contact us for booking your order and any inquiry.'
    },
    'print-canvas-lace': {
        image: 'https://zatraders.pk/wp-content/uploads/2024/06/Print-Ribbon-Satin-Lace-500x500-1.jpg',
        description: 'We also make print canvas lace in Pakistan. We are known for our product quality and reasonable prices. Contact us for booking your order and any inquiry.'
    },
    'print-ribbon-satin-lace': {
        image: 'https://zatraders.pk/wp-content/uploads/2024/06/Print-Lace-500x500-1.jpg',
        description: 'We also make print ribbon satin lace in Pakistan. We are known for our product quality and reasonable prices. Contact us for booking your order and any inquiry.'
    },
    'print-lace': {
        image: 'https://zatraders.pk/wp-content/uploads/2024/06/Print-Lace-500x500-1.jpg',
        description: 'We also make print lace in Pakistan. We are known for our product quality and reasonable prices. Contact us for booking your order and any inquiry.'
    },
    'kraft-paper-bags-manufacturers-in-karachi': {
        image: 'https://zatraders.pk/wp-content/uploads/2022/07/cheap-paper-bag-with-logo-500x500-1.jpg',
        description: 'We are one of the leading Kraft Paper Bags Manufacturers in Karachi. We provide high quality paper bags for all your needs.'
    }
};

const allProducts = Object.entries(categoriesData).flatMap(([categorySlug, titles]) => {
    return titles.flatMap((title, index) => {
        // Create 3 variations for each title, but if we have custom data, strictly use that for the base item
        return Array.from({ length: 3 }, (_, v) => {
            const categoryName = categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

            const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const slug = v === 0 ? baseSlug : `${baseSlug}-${v + 1}`;

            // Check for custom data - try specific slug first, then base slug
            const customData = customProductData[slug] || customProductData[baseSlug];

            let image = customData?.image;

            // Fallback logic if no custom image is found
            if (!image) {
                if (categorySlug === 'leather-patches') {
                    // Use one of the leather patch images as default fallback
                    image = '/LeartherTags/leather-patches-collection.jpg';
                } else if (categorySlug === 'woven-labels' || categorySlug === 'printed-tags' || categorySlug === 'hang-tags') {
                    // Use tag images
                    image = productImages[Math.floor(Math.random() * productImages.length)];
                } else if (categorySlug === 'paper-bags') {
                    image = 'https://zatraders.pk/wp-content/uploads/2022/07/cheap-paper-bag-with-logo-500x500-1.jpg'; // Fallback
                } else {
                    image = productImages[Math.floor(Math.random() * productImages.length)];
                }
            }

            const description = customData?.description || `Premium quality ${title} available for bulk orders. Contact us for custom designs and pricing. We offer high-quality printing and various finishing options.`;

            return {
                id: `${categorySlug}-${index}-${v}`,
                title: v === 0 ? title : `${title} - Variation ${v + 1}`,
                category: categoryName,
                categorySlug: categorySlug,
                image: image,
                slug: slug,
                price: 0, // Request for Quote
                description: description
            };
        });
    });
});

export const getProducts = (categorySlug: string, page: number, limit: number) => {
    const categoryProducts = allProducts.filter(p => p.categorySlug === categorySlug);
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
        data: categoryProducts.slice(start, end),
        total: categoryProducts.length,
        totalPages: Math.ceil(categoryProducts.length / limit)
    };
};

export const getProductBySlug = (slug: string) => {
    return allProducts.find(p => p.slug === slug);
};

export const getAllCategories = () => {
    return Object.keys(categoriesData);
};
