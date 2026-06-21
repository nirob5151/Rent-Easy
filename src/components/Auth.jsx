import React, { useState, useRef } from 'react';
import { User, Lock, GraduationCap, Camera, Pencil, ChevronDown, ShieldCheck, Users, FileText, ArrowRight, AlertCircle } from 'lucide-react';

function Auth({ onAuthSuccess, initialMode = 'signup', onBackToHome }) {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [role, setRole] = useState('student'); // 'student' or 'landlord'
  
  // Fields for Signup / Signin matching screenshots
  const [name, setName] = useState('Maruf Billah Anas');
  const [email, setEmail] = useState('22235103467@cse.bubt.edu.bd');
  const [password, setPassword] = useState('password123');
  const [university, setUniversity] = useState('Bangladesh University of Business and Technology (BUBT)');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signup') {
      if (!name.trim()) return setError('Please enter your full name.');
      if (!email.trim()) return setError('Please enter your email.');
      if (!password || password.length < 6) return setError('Password must be at least 6 characters.');
      if (role === 'student' && !university) return setError('Please select your university.');
      
      onAuthSuccess({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: role === 'student' ? 'Student Account' : 'Landlord Account',
        university: role === 'student' ? university : 'N/A',
        avatar: profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        id: role === 'student' ? (email.match(/\d+/) ? email.match(/\d+/)[0] : '22235103467') : 'LND-' + Math.floor(100000 + Math.random() * 900000),
        intake: role === 'student' ? '51/8' : null
      });
    } else {
      if (!email.trim()) return setError('Please enter your email.');
      if (!password) return setError('Please enter your password.');
      
      // Prefilled default credentials check or mock entry
      const userEmail = email.trim().toLowerCase();
      let loggedInUser = {
        name: 'Md. Masudur Rahman Anas',
        email: userEmail,
        role: role === 'student' ? 'Student Account' : 'Landlord Account',
        university: 'Bangladesh University of Business and Technology (BUBT)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        id: '22235103496',
        intake: '51/8'
      };

      if (role === 'landlord') {
        loggedInUser = {
          name: 'Mehadi Hasan',
          email: userEmail,
          role: 'Landlord Account',
          university: 'N/A',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
          id: 'LND-992813'
        };
      }

      onAuthSuccess(loggedInUser);
    }
  };

  const handleToggleMode = () => {
    setError(null);
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="auth-split-container">
      {/* Left branding panel */}
      <div className="auth-branding-pane">
        <div className="auth-branding-content">
          <div className="auth-brand-logo" onClick={onBackToHome} style={{ cursor: 'pointer' }}>
            <span>RentEase</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2' }}>
              Your gateway to simplified student housing.
            </h2>
            <p style={{ opacity: '0.9', fontSize: '1.1rem', lineHeight: '1.5' }}>
              Create an account or sign in to browse verified listings, search for compatible roommates, and draft secure leases.
            </p>
          </div>

          <div className="auth-branding-features">
            <div className="auth-feature-row">
              <div className="auth-feature-icon-wrapper">
                <ShieldCheck size={20} />
              </div>
              <div className="auth-feature-text">
                <h4>100% Verified Listings</h4>
                <p>Every apartment and landlord is vetting manually by campus managers to block housing fraud.</p>
              </div>
            </div>

            <div className="auth-feature-row">
              <div className="auth-feature-icon-wrapper">
                <Users size={20} />
              </div>
              <div className="auth-feature-text">
                <h4>Smart Compatibility Finder</h4>
                <p>Match with roommates based on daily schedules, study preferences, budget limits, and cleanliness standard.</p>
              </div>
            </div>

            <div className="auth-feature-row">
              <div className="auth-feature-icon-wrapper">
                <FileText size={20} />
              </div>
              <div className="auth-feature-text">
                <h4>Digital Lease Agreement Builder</h4>
                <p>Create print-ready digital contracts complying with localized housing guidelines in minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right card pane */}
      <div className="auth-card-pane">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1 className="auth-card-title">
              {mode === 'signup' ? 'Create Account' : 'Sign In'}
            </h1>
            <p className="auth-card-subtitle">
              {mode === 'signup' ? 'Get started with your university journey.' : 'Welcome back to your campus housing portal.'}
            </p>
          </div>

          {/* Role selector tab switcher */}
          <div className="auth-role-tabs">
            <button
              type="button"
              className={`auth-role-tab ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`auth-role-tab ${role === 'landlord' ? 'active' : ''}`}
              onClick={() => setRole('landlord')}
            >
              Landlord
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="auth-error-banner">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-layout">
            
            {/* Profile image picker (only on Sign Up mode) */}
            {mode === 'signup' && (
              <div className="profile-photo-upload-wrapper">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <div className="profile-photo-circle" onClick={handlePhotoClick}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile Preview" />
                  ) : (
                    <div className="placeholder-icon">
                      <Camera size={24} style={{ color: 'var(--text-light)', marginBottom: '4px' }} />
                      <span>img</span>
                    </div>
                  )}
                  <div className="profile-photo-edit-btn">
                    <Pencil size={12} />
                  </div>
                </div>
                <span className="profile-photo-label">Profile Photo</span>
              </div>
            )}

            {/* Full Name input (only on Sign Up mode) */}
            {mode === 'signup' && (
              <div className="auth-form-group">
                <label className="auth-form-label">Full Name</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    className="auth-input-field"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* University Email input */}
            <div className="auth-form-group">
              <label className="auth-form-label">University Email</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon" style={{ fontSize: '1.05rem', fontWeight: '500' }}>
                  @
                </span>
                <input
                  type="email"
                  className="auth-input-field"
                  placeholder={role === 'student' ? 'email@cse.bubt.edu.bd' : 'landlord@email.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="auth-form-group">
              <label className="auth-form-label">Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="auth-input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* University selector dropdown (only for Students on Sign Up mode) */}
            {mode === 'signup' && role === 'student' && (
              <div className="auth-form-group">
                <label className="auth-form-label">University</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">
                    <GraduationCap size={18} />
                  </span>
                  <select
                    className="auth-select-field"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    required
                  >
                    <option value="Bangladesh University of Business and Technology (BUBT)">
                      Bangladesh University of Business and Technology (BUBT)
                    </option>
                    <option value="Dhaka University (DU)">
                      Dhaka University (DU)
                    </option>
                    <option value="North South University (NSU)">
                      North South University (NSU)
                    </option>
                    <option value="BRAC University (BRACU)">
                      BRAC University (BRACU)
                    </option>
                    <option value="American International University-Bangladesh (AIUB)">
                      American International University-Bangladesh (AIUB)
                    </option>
                    <option value="United International University (UIU)">
                      United International University (UIU)
                    </option>
                  </select>
                  <span className="auth-select-chevron">
                    <ChevronDown size={18} />
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn-auth-submit">
              <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Toggle mode footer */}
          <div className="auth-footer">
            {mode === 'signup' ? (
              <span>
                Already have an account?{' '}
                <span className="auth-link" onClick={handleToggleMode}>
                  Sign In
                </span>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <span className="auth-link" onClick={handleToggleMode}>
                  Create Account
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
