import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = document.querySelectorAll('.section-observer');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: '💉', title: 'Safe Process', desc: 'Sterile equipment for every donation' },
    { icon: '🩺', title: 'Health Check', desc: 'Free health screening included' },
    { icon: '⚡', title: 'Quick & Easy', desc: 'Donation takes only 10-15 minutes' },
    { icon: '🎁', title: 'Save Lives', desc: 'One donation helps 3+ patients' }
  ];

  const stats = [
    { number: '50K+', label: 'Lives Saved' },
    { number: '15K+', label: 'Active Donors' },
    { number: '500+', label: 'Blood Camps' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundWrapper}>
        <div style={{...styles.gradientOrb, ...styles.orb1}} />
        <div style={{...styles.gradientOrb, ...styles.orb2}} />
        <div style={{...styles.gradientOrb, ...styles.orb3}} />
      </div>

      {/* Hero Section */}
      <section style={styles.hero} className="section-observer">
        <div style={styles.heroContent}>
          <div style={{
            ...styles.badge,
            transform: `translateY(${scrollY * 0.1}px)`
          }}>
            <span style={styles.badgeDot} />
            Join the Movement
          </div>
          
          <h1 style={styles.heroTitle}>
            Every Drop
            <span style={styles.heroTitleGradient}> Counts</span>
          </h1>
          
          <p style={styles.heroSubtitle}>
            Be the reason someone smiles today. Your blood donation can save up to three lives. 
            Take action now and become a hero in someone's story.
          </p>

          <div style={styles.heroCTA}>
            <a href="/register" style={styles.primaryBtn}>
              <span>Donate Blood</span>
              <span style={styles.btnArrow}>→</span>
            </a>
            <a href="/learn-more" style={styles.secondaryBtn}>
              Learn More
            </a>
          </div>

          <div style={styles.heroStats}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.statCard}>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.heroImage}>
          <div style={styles.floatingCard}>
            <img 
              src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&auto=format&fit=crop"
              alt="Blood donation"
              style={styles.cardImage}
            />
            <div style={styles.cardOverlay}>
              <div style={styles.pulseIcon}>❤️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection} className="section-observer">
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Why Choose Us</span>
          <h2 style={styles.sectionTitle}>Your Safety, Our Priority</h2>
        </div>

        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={{
                ...styles.featureCard,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section style={styles.processSection} className="section-observer">
        <div style={styles.processContent}>
          <div style={styles.processText}>
            <span style={styles.sectionBadge}>How It Works</span>
            <h2 style={styles.sectionTitle}>Simple 3-Step Process</h2>
            
            <div style={styles.processSteps}>
              <div style={styles.processStep}>
                <div style={styles.stepNumber}>01</div>
                <div style={styles.stepContent}>
                  <h3 style={styles.stepTitle}>Register Online</h3>
                  <p style={styles.stepDesc}>Quick and easy registration form takes less than 2 minutes</p>
                </div>
              </div>

              <div style={styles.processStep}>
                <div style={styles.stepNumber}>02</div>
                <div style={styles.stepContent}>
                  <h3 style={styles.stepTitle}>Health Screening</h3>
                  <p style={styles.stepDesc}>Free health check-up and eligibility assessment</p>
                </div>
              </div>

              <div style={styles.processStep}>
                <div style={styles.stepNumber}>03</div>
                <div style={styles.stepContent}>
                  <h3 style={styles.stepTitle}>Donate & Save</h3>
                  <p style={styles.stepDesc}>Safe, sterile process completed in 10-15 minutes</p>
                </div>
              </div>
            </div>

            <a href="/register" style={styles.processBtn}>
              Get Started Now
            </a>
          </div>

          <div style={styles.processImage}>
            <div style={styles.imageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&auto=format&fit=crop"
                alt="Donation process"
                style={styles.processImg}
              />
              <div style={styles.imageBadge}>
                <div style={styles.badgeIcon}>✓</div>
                <div>
                  <div style={styles.badgeTitle}>Certified Safe</div>
                  <div style={styles.badgeSubtitle}>WHO Standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection} className="section-observer">
        <div style={styles.ctaContent}>
          <div style={styles.ctaIcon}>🏥</div>
          <h2 style={styles.ctaTitle}>Ready to Make a Difference?</h2>
          <p style={styles.ctaText}>
            Join thousands of donors who are saving lives every day. Your contribution matters.
          </p>
          <div style={styles.ctaButtons}>
            <a href="/register" style={styles.ctaPrimaryBtn}>
              Donate Now
            </a>
            <a href="/register-camp" style={styles.ctaSecondaryBtn}>
              Organize Blood Camp
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 71, 87, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 71, 87, 0.8); }
        }

        .section-observer {
          animation: slideIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #0a0e27, #1a1f3a)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
  },
  gradientOrb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.3,
    animation: 'float 8s ease-in-out infinite',
  },
  orb1: {
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, #ff4757, #ff6348)',
    top: '-10%',
    left: '-10%',
  },
  orb2: {
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, #5f27cd, #341f97)',
    bottom: '10%',
    right: '-5%',
    animationDelay: '2s',
  },
  orb3: {
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, #00d2ff, #3a7bd5)',
    top: '50%',
    left: '50%',
    animationDelay: '4s',
  },
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '100px 5%',
    gap: '60px',
    flexWrap: 'wrap',
    zIndex: 1,
  },
  heroContent: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '600px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '30px',
    animation: 'slideIn 0.6s ease-out',
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#ff4757',
    animation: 'pulse 2s infinite',
  },
  heroTitle: {
    fontSize: '72px',
    fontWeight: '900',
    lineHeight: '1.1',
    marginBottom: '24px',
    animation: 'slideIn 0.6s ease-out 0.2s backwards',
  },
  heroTitleGradient: {
    background: 'linear-gradient(135deg, #ff4757 0%, #ff6348 50%, #ffa502 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '40px',
    maxWidth: '500px',
    animation: 'slideIn 0.6s ease-out 0.4s backwards',
  },
  heroCTA: {
    display: 'flex',
    gap: '16px',
    marginBottom: '60px',
    flexWrap: 'wrap',
    animation: 'slideIn 0.6s ease-out 0.6s backwards',
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #ff4757, #ff6348)',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(255, 71, 87, 0.4)',
    cursor: 'pointer',
  },
  btnArrow: {
    fontSize: '20px',
    transition: 'transform 0.3s ease',
  },
  secondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '16px 32px',
    background: 'transparent',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '16px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  heroStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '20px',
    animation: 'slideIn 0.6s ease-out 0.8s backwards',
  },
  statCard: {
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ff4757, #ffa502)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
  },
  heroImage: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingCard: {
    position: 'relative',
    width: '400px',
    height: '500px',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
    animation: 'float 6s ease-in-out infinite',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(10, 14, 39, 0.8), transparent)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '40px',
  },
  pulseIcon: {
    fontSize: '60px',
    animation: 'pulse 2s infinite',
  },
  featuresSection: {
    position: 'relative',
    padding: '120px 5%',
    zIndex: 1,
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  sectionBadge: {
    display: 'inline-block',
    padding: '8px 20px',
    background: 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.3)',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ff4757',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '20px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    animation: 'slideIn 0.6s ease-out',
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  featureDesc: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '1.6',
  },
  processSection: {
    position: 'relative',
    padding: '120px 5%',
    zIndex: 1,
  },
  processContent: {
    display: 'flex',
    gap: '80px',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  processText: {
    flex: '1',
    minWidth: '300px',
  },
  processSteps: {
    marginTop: '40px',
    marginBottom: '40px',
  },
  processStep: {
    display: 'flex',
    gap: '24px',
    marginBottom: '40px',
  },
  stepNumber: {
    fontSize: '32px',
    fontWeight: '900',
    color: 'rgba(255, 71, 87, 0.5)',
    minWidth: '60px',
  },
  stepContent: {
    flex: '1',
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  stepDesc: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '1.6',
  },
  processBtn: {
    display: 'inline-block',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #5f27cd, #341f97)',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(95, 39, 205, 0.4)',
  },
  processImage: {
    flex: '1',
    minWidth: '300px',
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
  },
  processImg: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    display: 'block',
  },
  imageBadge: {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    color: '#0a0e27',
  },
  badgeIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: '#fff',
  },
  badgeTitle: {
    fontSize: '16px',
    fontWeight: '700',
  },
  badgeSubtitle: {
    fontSize: '12px',
    color: 'rgba(10, 14, 39, 0.6)',
  },
  ctaSection: {
    position: 'relative',
    padding: '120px 5%',
    zIndex: 1,
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '80px 40px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '32px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  ctaIcon: {
    fontSize: '64px',
    marginBottom: '24px',
  },
  ctaTitle: {
    fontSize: '40px',
    fontWeight: '800',
    marginBottom: '20px',
  },
  ctaText: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '40px',
    lineHeight: '1.8',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaPrimaryBtn: {
    display: 'inline-block',
    padding: '18px 40px',
    background: 'linear-gradient(135deg, #ff4757, #ff6348)',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(255, 71, 87, 0.4)',
  },
  ctaSecondaryBtn: {
    display: 'inline-block',
    padding: '18px 40px',
    background: 'transparent',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '16px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
  },
};

export default HomePage;