import React from 'react';
import { Bell, Heart, MapPin, Search, Users, ArrowRight, MessageSquare, FileText } from 'lucide-react';

function StudentDashboard({ currentUser, onNavigate, onStartChat }) {
  const recommendations = [
    {
      id: 1,
      title: 'Mirpur House',
      price: 1200, // as shown in $1,200/mo screenshot
      location: '0.4 miles from campus',
      tags: ['Wifi Included', 'Gym Access'],
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Mirpur Villa',
      price: 950, // as shown in $950/mo screenshot
      location: '1.2 miles from campus',
      tags: ['Furnished', 'Free Parking'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const matches = [
    { name: 'Nirob', score: '94%', role: 'Computer Science, Senior', avatar: 'N' },
    { name: 'Sumon', score: '88%', role: 'Marketing, Junior', avatar: 'S' }
  ];

  const messages = [
    { id: 'chat_1', sender: 'Mirpur House', time: '10:24 AM', snippet: 'Your application for the Studio L...' },
    { id: 'chat_2', sender: 'Anas', time: 'Yesterday', snippet: 'Hey! Are you still looking for a ro...' }
  ];

  return (
    <div className="dashboard-layout-main">
      {/* Center column */}
      <div className="dashboard-center-panel">
        <div className="dashboard-header-block">
          <div className="dashboard-header-left">
            <h1>Welcome back, {currentUser.name.split(' ').pop() || 'Anas'}!</h1>
            <div className="dashboard-header-badge-row">
              <span className="badge-student-verified">Student Verified</span>
              <span>Central University • Junior Year</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="nav-icon-btn" style={{ padding: '0.5rem', background: 'white', borderRadius: '50%', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <Bell size={20} />
            </button>
            <button className="nav-post-btn" onClick={() => onNavigate('roommate')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '50px', padding: '0.6rem 1.25rem' }}>
              Find a Roommate
            </button>
          </div>
        </div>

        {/* Recommended housing */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Recommended for You</h3>
            <a href="#" className="widget-link" onClick={(e) => { e.preventDefault(); onNavigate('listings'); }}>
              View all
            </a>
          </div>
          <div className="recommended-carousel-grid">
            {recommendations.map(house => (
              <div key={house.id} className="recommended-card">
                <div className="recommended-image-wrapper">
                  <img src={house.image} alt={house.title} className="recommended-image" />
                  <button className="recommended-heart-btn">
                    <Heart size={16} />
                  </button>
                  <span className="recommended-price-tag">${house.price}/mo</span>
                </div>
                <div className="recommended-info">
                  <h4 style={{ fontWeight: '700', fontSize: '1.05rem' }}>{house.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <MapPin size={12} style={{ color: 'var(--primary)' }} />
                    {house.location}
                  </div>
                  <div className="listing-facilities" style={{ marginTop: '0.25rem' }}>
                    {house.tags.map((tag, i) => (
                      <span key={i} className="facility-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activities timeline */}
        <div className="recent-activity-panel">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Recent Activity</h3>
          <div className="activity-timeline">
            <div className="timeline-item">
              <div className="timeline-dot blue"></div>
              <div className="timeline-body">
                <div className="timeline-content">
                  <h4>Lease Inquiry Sent</h4>
                  <p>You messaged "The Hub Apartments" about the Studio Loft.</p>
                </div>
                <div className="timeline-time">2 hours ago</div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot green"></div>
              <div className="timeline-body">
                <div className="timeline-content">
                  <h4>New Roommate Match!</h4>
                  <p>You matched 94% with Jordan Smith.</p>
                </div>
                <div className="timeline-time">Yesterday</div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot orange"></div>
              <div className="timeline-body">
                <div className="timeline-content">
                  <h4>Profile Verified</h4>
                  <p>Your student enrollment has been confirmed.</p>
                </div>
                <div className="timeline-time">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right widgets column */}
      <div className="dashboard-right-panel">
        {/* Best matches widget */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>Best Matches</h3>
            <a href="#" className="widget-link" onClick={(e) => { e.preventDefault(); onNavigate('roommate'); }}>
              See All
            </a>
          </div>
          <div className="best-matches-list">
            {matches.map((match, i) => (
              <div key={i} className="match-item-card" onClick={() => onNavigate('roommate')}>
                <div className="match-item-left">
                  <div className="match-item-avatar-wrapper">
                    <div className="match-item-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', color: 'white', fontWeight: '700', fontSize: '0.9rem' }}>
                      {match.avatar}
                    </div>
                    <span className="match-score-pill">{match.score}</span>
                  </div>
                  <div className="match-item-details">
                    <h4>{match.name}</h4>
                    <p>{match.role}</p>
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-light)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Message preview widget */}
        <div className="widget-card">
          <div className="widget-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3>Messages</h3>
              <span className="chat-inbox-unread-count" style={{ fontSize: '0.65rem', width: '1.25rem', height: '1.25rem' }}>3</span>
            </div>
          </div>
          <div className="widget-messages-list">
            {messages.map(msg => (
              <div key={msg.id} className="widget-msg-item" onClick={() => onNavigate('messages')}>
                <div className="widget-msg-icon-box">
                  <MessageSquare size={16} />
                </div>
                <div className="widget-msg-details">
                  <div className="widget-msg-title-row">
                    <span className="widget-msg-name">{msg.sender}</span>
                    <span className="widget-msg-time">{msg.time}</span>
                  </div>
                  <div className="widget-msg-text">{msg.snippet}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-outline-widget" onClick={() => onNavigate('messages')}>
            Go to Inbox
          </button>
        </div>

        {/* Lease Status widget */}
        <div className="lease-status-card">
          <h4>Lease Status</h4>
          <span className="lease-status-title">Pending Approval</span>
          <span className="lease-status-subtitle">Skyline Residences • Unit 402B</span>
          <div className="lease-progress-container">
            <div className="lease-progress-bar">
              <div className="lease-progress-fill" style={{ width: '66%' }}></div>
            </div>
            <span className="lease-progress-percent">66%</span>
          </div>
          <div className="lease-card-bg-icon">
            <FileText size={72} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
