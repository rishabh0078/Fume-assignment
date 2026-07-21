import React, { useState } from 'react';
import ConversationInput from '../components/ConversationInput.jsx';
import AnalysisCard from '../components/AnalysisCard.jsx';
import { useAnalysis } from '../hooks/useAnalysis.js';

const Dashboard = () => {
  const { data, isLoading, error, analyze } = useAnalysis();
  const [reviewStatus, setReviewStatus] = useState('Pending Review');

  const handleAnalyze = async (text) => {
    setReviewStatus('Pending Review');
    await analyze(text);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'approved';
      case 'Rejected':
        return 'rejected';
      case 'Editing':
        return 'editing';
      default:
        return 'default';
    }
  };

  const statusClass = getStatusClass(reviewStatus);

  return (
    <div className="dashboard-layout">
      {/* Left Panel */}
      <aside className="sidebar">
        <ConversationInput onAnalyze={handleAnalyze} isLoading={isLoading} />
      </aside>

      {/* Right Panel */}
      <main className="main-content">
        <div className="main-scroll-area">
          <header className="dashboard-header">
            <div>
              <h1>Client Intelligence Dashboard</h1>
              <p className="text-muted">Review automated findings from the coach-client conversation.</p>
            </div>

            {data && !isLoading && (
              <div className={`review-status-badge ${statusClass}`}>
                Status: {reviewStatus}
              </div>
            )}
          </header>

          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <p>Analyzing conversation...</p>
            </div>
          ) : data ? (
            <div className="analysis-grid">
              <AnalysisCard finding={data.weekly_summary} categoryName="Weekly Summary" />
              <AnalysisCard finding={data.nutrition} categoryName="Nutrition" />
              <AnalysisCard finding={data.exercise} categoryName="Exercise" />
              <AnalysisCard finding={data.sleep} categoryName="Sleep" />
              <AnalysisCard finding={data.water} categoryName="Water Intake" />
              <AnalysisCard finding={data.stress} categoryName="Symptoms / Stress" />
              <AnalysisCard finding={data.symptoms} categoryName="Symptoms" />
              <AnalysisCard finding={data.engagement} categoryName="Engagement" />
              <AnalysisCard finding={data.barriers} categoryName="Key Barriers" />
              <AnalysisCard finding={data.pending_actions} categoryName="Pending Actions" />
              <AnalysisCard finding={data.risk_flags} categoryName="Risk Flags" />
              <AnalysisCard finding={data.coach_recommendation} categoryName="Coach Recommendation" />
            </div>
          ) : (
            <div className="empty-state">
              <svg className="empty-state-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              <h3>No Analysis Available</h3>
              <p>Paste a conversation transcript and click analyze to see findings.</p>
            </div>
          )}
        </div>

        {/* Action Bar at bottom */}
        {data && !isLoading && (
          <div className="action-bar">
            <button className="btn-secondary" onClick={() => setReviewStatus('Rejected')}>Reject</button>
            <button className="btn-secondary" onClick={() => setReviewStatus('Editing')}>Edit</button>
            <button className="btn-primary" onClick={() => setReviewStatus('Approved')}>Approve</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
