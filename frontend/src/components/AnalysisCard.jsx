import React from 'react';
import StatusBadge from './StatusBadge.jsx';

const AnalysisCard = ({ finding, categoryName }) => {
  const formatClassification = (text) => {
    if (!text) return '';
    return text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="text-muted">{categoryName}</span>
          <h3>{finding.title}</h3>
        </div>
        <StatusBadge status={finding.status} />
      </div>
      
      <div className="analysis-card-metrics">
        <div>
          <div className="text-muted metric-label">Confidence</div>
          <div className="metric-value">{Math.round(finding.confidence * 100)}%</div>
        </div>
        <div>
          <div className="text-muted metric-label">Classification</div>
          <div className="metric-value">{formatClassification(finding.classification)}</div>
        </div>
      </div>

      <div className="card-evidence">
        <div className="text-muted evidence-label">Evidence</div>
        <div>{finding.evidence}</div>
      </div>
    </div>
  );
};

export default AnalysisCard;
