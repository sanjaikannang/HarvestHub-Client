const RAZORPAY_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let loadPromise: Promise<boolean> | null = null;

// Loads the Razorpay Checkout script once and caches the in-flight promise
// so concurrent callers (e.g. a fast double-click) don't inject it twice.
export function loadRazorpayScript(): Promise<boolean> {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
        return Promise.resolve(true);
    }

    if (loadPromise) {
        return loadPromise;
    }

    loadPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = RAZORPAY_SRC;
        script.onload = () => resolve(true);
        script.onerror = () => {
            loadPromise = null;
            resolve(false);
        };
        document.body.appendChild(script);
    });

    return loadPromise;
}
