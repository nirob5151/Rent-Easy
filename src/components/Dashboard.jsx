import React, { useState } from 'react';
import { BarChart3, MessageSquare, Star, Zap, MapPin } from 'lucide-react';

function Dashboard({ listings, onAddListing, currentUser }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Mirpur 2, Dhaka');
  const [type, setType] = useState('Studio');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  
  // Facilities checklists
  const [wifi, setWifi] = useState(true);
  const [ac, setAc] = useState(false);
  const [security, setSecurity] = useState(true);
  const [generator, setGenerator] = useState(false);
  const [lift, setLift] = useState(false);
  const [kitchen, setKitchen] = useState(true);

  // Compute stats for landlord/student user context
  const myProperties = listings.slice(0, 2); // Seed example of "owned" properties
  const totalViews = 1240;
  const totalInquiries = 14;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    const facilities = [];
    if (wifi) facilities.push('Wi-Fi');
    if (ac) facilities.push('AC');
    if (security) facilities.push('Security');
    if (generator) facilities.push('Generator');
    if (lift) facilities.push('Lift');
    if (kitchen) facilities.push('Kitchen');

    const defaultImage = image.trim() || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80';

    onAddListing({
      title,
      price: parseInt(price),
      location,
      type,
      facilities,
      image: defaultImage,
      description,
      landlord: {
        name: currentUser.name,
        rating: 5.0,
        phone: '+880 1700-000000'
      }
    });

    // Reset fields
    setTitle('');
    setPrice('');
    setLocation('Mirpur 2, Dhaka');
    setType('Studio');
    setImage('');
    setDescription('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Dashboard Stats */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Welcome Back, {currentUser.name}!</h2>
        <p style={{ color: 'var(--text-muted)' }}>Role: {currentUser.role} • Student ID: {currentUser.id}</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel dashboard-card">
          <div style={{ color: 'var(--primary-light)', marginBottom: '0.75rem' }}>
            <BarChart3 size={28} />
          </div>
          <h3>{totalViews}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Listing Impressions</p>
        </div>

        <div className="glass-panel dashboard-card">
          <div style={{ color: 'var(--primary-light)', marginBottom: '0.75rem' }}>
            <MessageSquare size={28} />
          </div>
          <h3>{totalInquiries}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Inquiries Received</p>
        </div>

        <div className="glass-panel dashboard-card">
          <div style={{ color: 'var(--warning)', marginBottom: '0.75rem' }}>
            <Star size={28} fill="var(--warning)" />
          </div>
          <h3>4.8 / 5.0</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Tenant Satisfaction</p>
        </div>

        <div className="glass-panel dashboard-card">
          <div style={{ color: 'var(--secondary)', marginBottom: '0.75rem' }}>
            <Zap size={28} fill="var(--secondary)" />
          </div>
          <h3>Active</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Host Status</p>
        </div>
      </div>

      {/* Listing Form & Management splits */}
      <div className="contract-split">
        {/* Form to add listing */}
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>Post a New Listing</h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="filter-label">Listing Title *</label>
              <input 
                type="text" 
                placeholder="e.g. Cozy Sublet Room near BUBT" 
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="filter-label">Monthly Rent (BDT) *</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5000" 
                  className="form-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="filter-label">Room Type *</label>
                <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Studio">Studio</option>
                  <option value="Shared Room">Shared Room</option>
                  <option value="Sublet">Sublet</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Full Flat">Full Flat</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="filter-label">Location Details *</label>
              <input 
                type="text" 
                placeholder="e.g. Mirpur 2, Dhaka (Near BUBT Gate 1)" 
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="filter-label">Image URL</label>
              <input 
                type="url" 
                placeholder="https://example.com/apartment.jpg" 
                className="form-input"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="filter-label">Facilities & Amenities</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.25rem' }}>
                <label className="checkbox-item">
                  <input type="checkbox" checked={wifi} onChange={(e) => setWifi(e.target.checked)} />
                  Wi-Fi
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} />
                  Air Conditioner (AC)
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={security} onChange={(e) => setSecurity(e.target.checked)} />
                  24/7 Security
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={generator} onChange={(e) => setGenerator(e.target.checked)} />
                  Generator Backup
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={lift} onChange={(e) => setLift(e.target.checked)} />
                  Lift/Elevator
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={kitchen} onChange={(e) => setKitchen(e.target.checked)} />
                  Kitchen Facility
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="filter-label">Description *</label>
              <textarea 
                placeholder="Provide detailed description of facilities, restrictions, bills, utility fees..." 
                className="form-input"
                rows="4"
                style={{ resize: 'none' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Publish Property
            </button>
          </form>
        </section>

        {/* Owned properties list */}
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>My Active Listings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myProperties.map((prop, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '1rem' }}>{prop.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={12} style={{ color: 'var(--primary-light)' }} />
                    {prop.location}
                  </p>
                  <p style={{ color: 'var(--primary-light)', fontWeight: '700', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {prop.price.toLocaleString()} BDT/mo
                  </p>
                </div>
                <div>
                  <span className="badge badge-verified" style={{ position: 'static', padding: '0.25rem 0.5rem' }}>Active</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
