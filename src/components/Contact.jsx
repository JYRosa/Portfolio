function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <p className="section-label">CONTACT</p>
        <h2 id="contact-title">Contact</h2>
        <address className="contact-list">
          <div>
            <strong>Email</strong>
            <a href="mailto:didwodud52@gmail.com">didwodud52@gmail.com</a>
          </div>
          <div>
            <strong>GitHub</strong>
            <a
              href="https://github.com/JYRosa"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/JYRosa
            </a>
          </div>
          <div>
            <strong>LinkedIn / Blog</strong>
            <a href="https://example.com" target="_blank" rel="noreferrer">
              https://example.com
            </a>
          </div>
        </address>
      </div>
    </section>
  )
}

export default Contact
