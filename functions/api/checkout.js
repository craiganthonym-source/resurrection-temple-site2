// RT Shop — Stripe Checkout backend (Cloudflare Pages Function)
// Route: /api/checkout
// Creates a Stripe Checkout Session and returns its hosted URL.
// The secret key is read from the STRIPE_SECRET_KEY environment variable
// set in the Cloudflare Pages dashboard — NEVER hard-code it here.

export async function onRequestPost(context) {
  try {
    const STRIPE_SECRET = context.env.STRIPE_SECRET_KEY;
    if (!STRIPE_SECRET) {
      return jsonError('Payment is not configured yet. Please contact us to complete your order.', 500);
    }

    const body = await context.request.json();
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
      return jsonError('Your cart is empty.', 400);
    }

    // Only allow redirects back to our own site (no open redirect).
    const origin = new URL(context.request.url).origin;
    let returnPath = '/pages/wear';
    try {
      if (body.returnUrl && body.returnUrl.indexOf(origin) === 0) {
        returnPath = new URL(body.returnUrl).pathname;
      }
    } catch (e) { /* fall back to default path */ }

    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('success_url', origin + returnPath + '?paid=1');
    params.append('cancel_url', origin + returnPath + '?canceled=1');
    params.append('billing_address_collection', 'auto');
    params.append('phone_number_collection[enabled]', 'true');
    params.append('shipping_address_collection[allowed_countries][0]', 'US');

    // Line items (prices come from the cart but are re-validated as numbers here)
    items.forEach((item, i) => {
      const cents = Math.round(Number(item.price) * 100);
      const qty = Math.max(1, parseInt(item.qty, 10) || 1);
      if (!isFinite(cents) || cents <= 0) return;
      const name = String(item.name || 'RT Shop Item').slice(0, 250);
      params.append(`line_items[${i}][price_data][currency]`, 'usd');
      params.append(`line_items[${i}][price_data][unit_amount]`, String(cents));
      params.append(`line_items[${i}][price_data][product_data][name]`, name);
      params.append(`line_items[${i}][quantity]`, String(qty));
    });

    // Flat shipping (your site: free over $75, otherwise $8.99)
    const shipCents = Math.round(Number(body.shipping || 0) * 100);
    params.append('shipping_options[0][shipping_rate_data][type]', 'fixed_amount');
    params.append('shipping_options[0][shipping_rate_data][display_name]', shipCents <= 0 ? 'Free Shipping' : 'Standard Shipping');
    params.append('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(Math.max(0, shipCents)));
    params.append('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'usd');

    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + STRIPE_SECRET,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await resp.json();
    if (session && session.url) {
      return new Response(JSON.stringify({ url: session.url }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return jsonError((session && session.error && session.error.message) || 'Could not start checkout.', 400);
  } catch (err) {
    return jsonError('Checkout error. Please try again.', 500);
  }
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status: status || 400,
    headers: { 'Content-Type': 'application/json' },
  });
}
