export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track Page Views
export const pageview = (url: string) => {
    if (typeof window !== "undefined") {
        // Meta Pixel PageView
        if ((window as any).fbq) {
            (window as any).fbq('track', 'PageView');
        }
        // Google Analytics PageView
        if ((window as any).gtag && GA_MEASUREMENT_ID) {
            (window as any).gtag('config', GA_MEASUREMENT_ID, {
                page_path: url,
            });
        }
    }
};

// Track Custom Event
export const event = (name: string, options = {}) => {
    if (typeof window !== "undefined") {
        // Meta Pixel Custom Event
        if ((window as any).fbq) {
            (window as any).fbq('track', name, options);
        }
        // Google Analytics Custom Event
        if ((window as any).gtag) {
            (window as any).gtag('event', name, options);
        }
    }
};

interface PurchaseParams {
    transactionId: string;
    value: number;
    currency: string;
    flavor: string;
    flavorName: string;
    quantity: number;
}

// Track Purchase Event
export const trackPurchase = (data: PurchaseParams) => {
    if (typeof window !== "undefined") {
        console.log("Tracking Purchase Event:", data);
        
        // Meta Pixel Purchase tracking
        if ((window as any).fbq) {
            (window as any).fbq('track', 'Purchase', {
                value: data.value,
                currency: data.currency || 'INR',
                content_type: 'product',
                contents: [
                    {
                        id: data.flavor,
                        quantity: data.quantity,
                        item_price: (data.value / data.quantity)
                    }
                ],
                content_ids: [data.flavor],
                content_name: data.flavorName
            });
        }

        // Google Analytics E-commerce Purchase tracking
        if ((window as any).gtag) {
            (window as any).gtag('event', 'purchase', {
                transaction_id: data.transactionId,
                value: data.value,
                tax: 0,
                shipping: 69, // standard shipping
                currency: data.currency || 'INR',
                items: [
                    {
                        item_id: data.flavor,
                        item_name: data.flavorName,
                        index: 0,
                        item_category: 'Coconut Hydration Drink',
                        price: (data.value / data.quantity),
                        quantity: data.quantity
                    }
                ]
            });
        }
    }
};
