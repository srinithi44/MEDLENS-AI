import React, { useRef, useEffect, useState } from 'react';
import { Evidence, Finding } from '../types';

interface EvidenceViewerProps {
  imageUrl: string;
  findings: Finding[];
  selectedFindingId: string | null;
  onSelectFinding: (id: string) => void;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  imageUrl,
  findings,
  selectedFindingId,
  onSelectFinding,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Filter for findings that actually have visual evidence on this image
  const visibleFindings = findings.filter(f => 
    f.evidence.some(e => e.source === 'MODEL_VISION' && e.bbox)
  );

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden rounded-lg shadow-inner group">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50">
          <div className="animate-pulse">Loading Image...</div>
        </div>
      )}
      
      <div className="relative max-w-full max-h-full" ref={containerRef}>
        <img
          src={imageUrl}
          alt="Medical Scan"
          className="max-w-full max-h-[600px] object-contain"
          onLoad={() => setLoaded(true)}
        />
        
        {loaded && visibleFindings.map((finding) => {
          const evidence = finding.evidence.find(e => e.source === 'MODEL_VISION' && e.bbox);
          if (!evidence?.bbox) return null;

          const { x, y, width, height } = evidence.bbox;
          const isSelected = selectedFindingId === finding.id;
          
          return (
            <div
              key={finding.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectFinding(finding.id);
              }}
              className={`absolute border-2 cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'border-warning bg-warning/20 shadow-[0_0_15px_rgba(245,158,11,0.5)] z-20' 
                  : 'border-primary/60 hover:border-primary hover:bg-primary/10 z-10'
              }`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${width}%`,
                height: `${height}%`,
              }}
              title={`${finding.category}: ${finding.confidence * 100}% conf`}
            >
              {isSelected && (
                <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {finding.category} ({Math.round(finding.confidence * 100)}%)
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
