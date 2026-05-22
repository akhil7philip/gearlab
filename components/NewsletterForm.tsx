"use client";

export default function NewsletterForm() {
  return (
    <div className="newsletter-cta">
      <h3>⚡ Get power station deals before they sell out</h3>
      <p>We track prices daily. When the Anker C1000 drops to $470, you'll be the first to know.</p>
      <form
        className="flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Newsletter signup coming soon!");
        }}
      >
        <input type="email" placeholder="your@email.com" required />
        <button type="submit">Subscribe</button>
      </form>
      <p className="text-xs mt-3 text-text-muted">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
