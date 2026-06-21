import React, { useState } from 'react';
import { Sparkles, Brush, Sofa, Sun, Moon, BookOpen, Users, Ban, Flame, MessageSquare, ArrowRight, Check, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_ROOMMATES } from '../database/mockDb';

function RoommateMatching({ currentUser, onStartChat }) {
  const [filterUni, setFilterUni] = useState('All');
  const [filterBudget, setFilterBudget] = useState('All');
  const [filterGender, setFilterGender] = useState('Any');

  // Hardcoded roommate list based exactly on Screenshot 4 to wow the user
  const roommates = [
    {
      name: 'Bushra',
      uni: 'BUBT • Senior',
      budget: '5000 BDT/mo',
      match: '98%',
      bio: 'Biology major. Love weekend hikes and quiet study sessions. Very organized!',
      tags: ['Quiet', 'Non-smoker', 'Morning Person'],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
      gender: 'Female',
      budgetTier: 'low'
    },
    {
      name: 'Anas',
      uni: 'BUBT • Junior',
      budget: '1,450 BDT/mo',
      match: '92%',
      bio: 'Computer Science. I spend a lot of time coding. Looking for a chill environment.',
      tags: ['Night Owl', 'Studious', 'Fitness Enthusiast'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      gender: 'Male',
      budgetTier: 'All'
    },
    {
      name: 'Shimu',
      uni: 'BUBT • BSC',
      budget: '1,800 BDT/mo',
      match: '89%',
      bio: 'History of Art. I love visiting galleries and I\'m very tidy. Looking for a fellow grad..',
      tags: ['Very Clean', 'Early Bird', 'No Pets'],
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&h=120&q=80',
      gender: 'Female',
      budgetTier: 'high'
    },
    {
      name: 'Nirob',
      uni: 'BUBT • Sophomore',
      budget: '1,100 BDT/mo',
      match: '85%',
      bio: 'Economics major. I enjoy cooking for friends and exploring local coffee shops.',
      tags: ['Social', 'Chef', 'Extrovert'],
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      gender: 'Male',
      budgetTier: 'All'
    },
    {
      name: 'Asa',
      uni: 'BUBT • Senior',
      budget: '2,000 BDT/mo',
      match: '82%',
      bio: 'Fine Arts major. Active in student council. Looking for a lively shared house.',
      tags: ['Creative', 'Outgoing', 'Loves Pets'],
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      gender: 'Female',
      budgetTier: 'high'
    }
  ];

  const filteredRoommates = roommates.filter(person => {
    // University Filter
    if (filterUni !== 'All' && !person.uni.includes(filterUni)) {
      return false;
    }
    // Budget Range Filter
    if (filterBudget !== 'All' && person.budgetTier !== filterBudget) {
      return false;
    }
    // Gender Filter
    if (filterGender !== 'Any' && person.gender !== filterGender) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ width: '100%' }}>
      {/* Title Header */}
      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>Find your ideal roommate</h2>
        <p style={{ color: 'var(--text-muted)' }}>We've matched you with students sharing similar lifestyle habits.</p>
      </div>

      {/* Filter Row */}
      <section className="roommate-filters-header">
        <div className="roommate-filters-row">
          <div className="roommate-filter-select-group">
            <label className="roommate-filter-label">University</label>
            <select className="filter-input" value={filterUni} onChange={(e) => setFilterUni(e.target.value)}>
              <option value="All">All Universities</option>
              <option value="BUBT">BUBT Only</option>
            </select>
          </div>

          <div className="roommate-filter-select-group">
            <label className="roommate-filter-label">Budget Range</label>
            <select className="filter-input" value={filterBudget} onChange={(e) => setFilterBudget(e.target.value)}>
              <option value="All">800 - 1,500 BDT</option>
              <option value="low">Under 800 BDT</option>
              <option value="high">Over 1,500 BDT</option>
            </select>
          </div>

          <div className="roommate-filter-select-group">
            <label className="roommate-filter-label">Gender</label>
            <select className="filter-input" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button className="btn-filter-apply">
            Apply Filters
          </button>
        </div>
      </section>

      {/* Grid List */}
      <section className="roommates-list-container">
        <div className="roommates-grid">
          {filteredRoommates.map((person, i) => (
            <div key={i} className="roommate-card">
              <span className="roommate-card-match-score">
                <Sparkles size={12} fill="var(--secondary)" /> {person.match} Match
              </span>

              <div className="roommate-card-header">
                <img src={person.image} alt={person.name} className="roommate-card-photo" />
                <div className="roommate-card-title">
                  <h3>{person.name}</h3>
                  <p>{person.uni}</p>
                </div>
              </div>

              <div className="roommate-card-budget-row">
                <span className="roommate-card-budget-label">BUDGET</span>
                <span className="roommate-card-budget-val">{person.budget}</span>
              </div>

              <p className="roommate-card-bio">
                {person.bio}
              </p>

              <div className="roommate-card-tags">
                {person.tags.map((tag, idx) => (
                  <span key={idx} className="facility-tag" style={{ borderRadius: '50px', padding: '0.15rem 0.6rem' }}>{tag}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="roommate-card-actions">
                  <button className="btn-card-secondary" style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem' }}>
                    View Profile
                  </button>
                  <button 
                    className="btn-card-action" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', padding: '0.4rem 0.5rem', fontSize: '0.8rem' }}
                    onClick={() => {
                      const msg = `Hi ${person.name}, I saw we have a roommate match compatibility of ${person.match}. Let's chat!`;
                      onStartChat(person.name, msg);
                    }}
                  >
                    <MessageSquare size={14} /> Message
                  </button>
                </div>
                
                <button className="btn-card-connect" onClick={() => alert(`Connect request sent to ${person.name}!`)}>
                  Connect
                </button>
              </div>
            </div>
          ))}

          {/* Special blue widget card */}
          <div className="roommate-cta-card">
            <h3>Don't see your match?</h3>
            <p>Our matching algorithm updates hourly based on your lifestyle preferences and university courses.</p>
            <button className="btn-cta-widget-white">
              Update My Preferences
            </button>
            <div className="roommate-cta-icon-bg">
              <Users size={96} />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination" style={{ marginTop: '3rem' }}>
          <button className="pagination-item"><ChevronLeft size={16} /></button>
          <button className="pagination-item active">1</button>
          <button className="pagination-item">2</button>
          <button className="pagination-item">3</button>
          <span style={{ color: 'var(--text-light)', margin: '0 0.25rem' }}>...</span>
          <button className="pagination-item">12</button>
          <button className="pagination-item"><ChevronRight size={16} /></button>
        </div>
      </section>
    </div>
  );
}

export default RoommateMatching;
