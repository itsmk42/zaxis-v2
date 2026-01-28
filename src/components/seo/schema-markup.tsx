"use client";

export function SchemaMarkup() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["LocalBusiness", "ProfessionalService"],
                "@id": "https://zaxisstudio.com/#organization",
                name: "Z Axis Studio",
                alternateName: "Z Axis 3D Printing",
                description: "Professional 3D Printing Service specializing in custom PLA, PETG, and Resin prints. We create lithophanes, personalized lamps, keychains, and custom 3D printed products.",
                url: "https://zaxisstudio.com",
                telephone: "+91-9483654329",
                email: "support@zaxisstudio.com",
                priceRange: "₹500 - ₹10,000",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Mangaluru",
                    addressLocality: "Mangaluru",
                    addressRegion: "Karnataka",
                    postalCode: "575001",
                    addressCountry: "IN",
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: 12.9141,
                    longitude: 74.8560,
                },
                areaServed: [
                    {
                        "@type": "Country",
                        name: "India",
                    },
                    {
                        "@type": "City",
                        name: "Bangalore",
                    },
                    {
                        "@type": "City",
                        name: "Mangaluru",
                    },
                    {
                        "@type": "City",
                        name: "Mysore",
                    },
                    {
                        "@type": "City",
                        name: "Mumbai",
                    },
                    {
                        "@type": "City",
                        name: "Chennai",
                    },
                    {
                        "@type": "City",
                        name: "Hyderabad",
                    },
                    {
                        "@type": "City",
                        name: "Delhi",
                    },
                ],
                openingHoursSpecification: [
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        opens: "10:00",
                        closes: "19:00",
                    },
                ],
                sameAs: [
                    "https://www.instagram.com/zaxisstudio",
                    "https://www.facebook.com/zaxisstudio",
                ],
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "3D Printing Services",
                    itemListElement: [
                        {
                            "@type": "Offer",
                            itemOffered: {
                                "@type": "Service",
                                name: "Custom 3D Printing",
                                description: "Custom 3D printing service with PLA, PETG, and Resin materials",
                            },
                        },
                        {
                            "@type": "Offer",
                            itemOffered: {
                                "@type": "Service",
                                name: "Lithophane Creation",
                                description: "Transform your photos into stunning 3D lithophanes",
                            },
                        },
                        {
                            "@type": "Offer",
                            itemOffered: {
                                "@type": "Service",
                                name: "Custom Lamps",
                                description: "Personalized 3D printed lamps and lighting solutions",
                            },
                        },
                    ],
                },
            },
            {
                "@type": "WebSite",
                "@id": "https://zaxisstudio.com/#website",
                url: "https://zaxisstudio.com",
                name: "Z Axis Studio",
                description: "Professional 3D Printing Service in India",
                publisher: {
                    "@id": "https://zaxisstudio.com/#organization",
                },
                potentialAction: {
                    "@type": "SearchAction",
                    target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://zaxisstudio.com/shop?search={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
