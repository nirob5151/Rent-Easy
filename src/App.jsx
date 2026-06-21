import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Listings from './components/Listings';
import RoommateMatching from './components/RoommateMatching';
import Messaging from './components/Messaging';
import StudentDashboard from './components/StudentDashboard';
import ContractBuilder from './components/ContractBuilder';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { DEFAULT_LISTINGS, DEFAULT_CHATS } from './database/mockDb';
import { Home as HomeIcon, Search, Users, MessageSquare, FileText, Bell, LogOut, HelpCircle, Heart, Star, Settings } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('rentease_listings');
    return saved ? JSON.parse(saved) : DEFAULT_LISTINGS;
  });
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('rentease_chats');
    return saved ? JSON.parse(saved) : DEFAULT_CHATS;
  });
  const [activeChatId, setActiveChatId] = useState('chat_anas');
  const [selectedListing, setSelectedListing] = useState(null);
  const [authMode, setAuthMode] = useState('signup');
  
  // Dynamic user session state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('rentease_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('rentease_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('rentease_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rentease_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rentease_user');
    }
  }, [currentUser]);

  // Auth Redirect Guard
  useEffect(() => {
    if (!currentUser && ['dashboard', 'messages', 'contract', 'saved', 'settings', 'roommate'].includes(currentPage)) {
      setAuthMode('signin');
      setCurrentPage('auth');
    }
  }, [currentPage, currentUser]);

  const addListing = (newListing) => {
    setListings(prev => [
      {
        ...newListing,
        id: prev.length + 1,
        verified: false,
        reviews: []
      },
      ...prev
    ]);
    setCurrentPage('listings');
  };

  const addReview = (listingId, review) => {
    setListings(prev => prev.map(item => {
      if (item.id === listingId) {
        const updatedReviews = [review, ...item.reviews];
        const newRating = parseFloat(
          ((item.landlord.rating * item.reviews.length + review.rating) / (item.reviews.length + 1)).toFixed(1)
        );
        return {
          ...item,
          reviews: updatedReviews,
          landlord: {
            ...item.landlord,
            rating: newRating
          }
        };
      }
      return item;
    }));
  };

  const startChat = (contactName, initialMsgText = '') => {
    setCurrentPage('messages');
    setActiveChatId('chat_anas');
  };

  const sendChatMessage = (chatId, text) => {
    // handled inside Messaging state
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  // Helper to check if page is a sidebar portal page
  const isPortalPage = ['dashboard', 'messages', 'contract', 'saved', 'settings'].includes(currentPage) && currentUser !== null;

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <header className="navbar">
        <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
          <div className="nav-logo-text">RentEase</div>
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <span className={`nav-link ${currentPage === 'listings' ? 'active' : ''}`} onClick={() => { setSelectedListing(null); setCurrentPage('listings'); }}>
                Search
              </span>
            </li>
            <li>
              <span className={`nav-link ${currentPage === 'roommate' ? 'active' : ''}`} onClick={() => setCurrentPage('roommate')}>
                Roommates
              </span>
            </li>
            <li>
              <span className={`nav-link ${currentPage === 'contract' ? 'active' : ''}`} onClick={() => setCurrentPage('contract')}>
                Contracts
              </span>
            </li>
          </ul>
        </nav>
        
        <div className="nav-right-actions">
          {currentUser ? (
            <>
              <button className="nav-icon-btn">
                <Bell size={20} />
              </button>
              <button className="nav-icon-btn" onClick={() => setCurrentPage('messages')} style={{ position: 'relative' }}>
                <MessageSquare size={20} />
                <span className="chat-inbox-unread-count" style={{ position: 'absolute', top: '-6px', right: '-6px', fontSize: '0.6rem', width: '14px', height: '14px' }}>3</span>
              </button>
              <img 
                src={currentUser.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"} 
                alt="User Avatar" 
                className="nav-avatar-icon" 
                onClick={() => setCurrentPage('dashboard')}
              />
            </>
          ) : (
            <>
              <span className="nav-signin" onClick={() => { setAuthMode('signin'); setCurrentPage('auth'); }}>Sign In</span>
              <button className="nav-post-btn" onClick={() => { setAuthMode('signup'); setCurrentPage('auth'); }}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>


      {/* Main Content Area */}
      {isPortalPage ? (
        /* Sidebar Portal Layout */
        <div className="student-portal-layout">
          <aside className="portal-sidebar">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
              <div className="sidebar-profile">
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"} 
                  alt="User Avatar" 
                  className="sidebar-avatar" 
                />
                <div className="sidebar-user-info">
                  <div className="sidebar-user-name">{currentUser.name.split(' ').pop()}</div>
                  <div className="sidebar-user-role">{currentUser.role}</div>
                </div>
              </div>

              {currentUser.role.includes('Student') && (
                <button className="sidebar-cta-btn" onClick={() => setCurrentPage('roommate')}>
                  <Users size={16} /> <span className="sidebar-btn-text">+ Find a Roommate</span>
                </button>
              )}

              <ul className="sidebar-menu">
                <li className={`sidebar-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentPage('dashboard')}>
                  <HomeIcon size={18} /> <span className="sidebar-menu-label">Dashboard</span>
                </li>
                <li className={`sidebar-item ${currentPage === 'listings' ? 'active' : ''}`} onClick={() => { setSelectedListing(null); setCurrentPage('listings'); }}>
                  <Search size={18} /> <span className="sidebar-menu-label">{currentUser.role.includes('Landlord') ? 'My Properties' : 'My Listings'}</span>
                </li>
                <li className={`sidebar-item ${currentPage === 'messages' ? 'active' : ''}`} onClick={() => setCurrentPage('messages')}>
                  <MessageSquare size={18} /> <span className="sidebar-menu-label">Messages</span>
                </li>
                {currentUser.role.includes('Student') && (
                  <li className={`sidebar-item ${currentPage === 'roommate' ? 'active' : ''}`} onClick={() => setCurrentPage('roommate')}>
                    <Users size={18} /> <span className="sidebar-menu-label">Matches</span>
                  </li>
                )}
                <li className={`sidebar-item ${currentPage === 'contract' ? 'active' : ''}`} onClick={() => setCurrentPage('contract')}>
                  <FileText size={18} /> <span className="sidebar-menu-label">Documents</span>
                </li>
                {currentUser.role.includes('Student') && (
                  <li className={`sidebar-item ${currentPage === 'saved' ? 'active' : ''}`} onClick={() => setCurrentPage('saved')}>
                    <Heart size={18} /> <span className="sidebar-menu-label">Saved Listings</span>
                  </li>
                )}
                <li className={`sidebar-item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => setCurrentPage('settings')}>
                  <Settings size={18} /> <span className="sidebar-menu-label">Settings</span>
                </li>
              </ul>
            </div>

            <div className="sidebar-footer">
              <span className="sidebar-item" onClick={() => alert('Support tickets matching CSE BUBT.')}>
                <HelpCircle size={18} /> <span className="sidebar-menu-label">Help Center</span>
              </span>
              <span className="sidebar-item" onClick={handleLogout}>
                <LogOut size={18} /> <span className="sidebar-menu-label">Logout</span>
              </span>
            </div>
          </aside>

          <main className="portal-content-pane">
            {currentPage === 'dashboard' && (
              currentUser.role.includes('Landlord') ? (
                <Dashboard 
                  listings={listings} 
                  onAddListing={addListing} 
                  currentUser={currentUser} 
                />
              ) : (
                <StudentDashboard 
                  currentUser={currentUser} 
                  onNavigate={(tab) => setCurrentPage(tab)}
                  onStartChat={startChat}
                />
              )
            )}
            {currentPage === 'messages' && (
              <Messaging 
                chats={chats}
                activeChatId={activeChatId}
                setActiveChatId={setActiveChatId}
                onSendMessage={sendChatMessage}
              />
            )}
            {currentPage === 'contract' && (
              <ContractBuilder currentUser={currentUser} />
            )}
            {currentPage === 'saved' && (
              <div className="glass-panel" style={{ padding: '3rem', background: 'white', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                <Heart size={48} style={{ color: 'var(--text-light)', marginBottom: '1rem' }} />
                <h3>No Saved Listings Yet</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Browse properties and hit the heart icon to save them here.</p>
              </div>
            )}
            {currentPage === 'settings' && (
              <div className="glass-panel" style={{ padding: '2rem', background: 'white', border: '1px solid var(--border-light)' }}>
                <h3 style={{ marginBottom: '1rem' }}>Account Settings</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                  <div className="form-group">
                    <label className="filter-label">Profile Name</label>
                    <input type="text" className="form-input" defaultValue={currentUser.name} />
                  </div>
                  <div className="form-group">
                    <label className="filter-label">University Email</label>
                    <input type="email" className="form-input" defaultValue={currentUser.email} disabled />
                  </div>
                  <button type="button" className="btn-filter-apply" style={{ width: '120px' }} onClick={() => alert('Settings saved!')}>Save</button>
                </form>
              </div>
            )}
          </main>
        </div>
      ) : (
        /* Full-Width Core Pages (Home, Listings, Roommate Matching, Auth) */
        <main className="screen-content" style={{ padding: (currentPage === 'home' || currentPage === 'auth') ? '0' : '2rem' }}>
          {currentPage === 'home' && (
            <Hero 
              onSearch={() => setCurrentPage('listings')} 
              onExploreRoommates={() => setCurrentPage('roommate')}
            />
          )}

          {currentPage === 'auth' && (
            <Auth 
              onAuthSuccess={handleAuthSuccess} 
              initialMode={authMode} 
              onBackToHome={() => setCurrentPage('home')}
            />
          )}
          
          {currentPage === 'listings' && (
            <Listings 
              listings={listings} 
              selectedListing={selectedListing}
              setSelectedListing={setSelectedListing}
              onStartChat={startChat}
              onSubmitReview={addReview}
            />
          )}

          {currentPage === 'roommate' && (
            <RoommateMatching 
              currentUser={currentUser} 
              onStartChat={startChat}
            />
          )}
        </main>
      )}

      {/* Main footer visible on core landing flow */}
      {!isPortalPage && (
        <footer className="main-footer">
          <div className="main-footer-container">
            <div className="main-footer-brand">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>RentEase</h3>
              <p>Simplifying student living through smart roommate matching and seamless verified housing listings.</p>
              <div className="social-icons-row">
                <a href="#" className="social-icon-btn">@</a>
                <a href="#" className="social-icon-btn">#</a>
                <a href="#" className="social-icon-btn">$</a>
              </div>
            </div>
            
            <div className="main-footer-links-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Student Stories</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="main-footer-links-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Landlord FAQ</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>

            <div className="main-footer-links-col">
              <h4>Stay Connected</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Subscribe to campus listings and housing availability alerts.</p>
            </div>
          </div>
          <div className="main-footer-credits">
            &copy; 2026 RentEase Inc. Built for university students. BUBT CSE Intake 51/8.
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
