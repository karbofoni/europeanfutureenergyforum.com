'use client';

interface HealthGaugeProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function HealthGauge({ score, size = 'lg', showLabel = true }: HealthGaugeProps) {
  const sizeConfig = {
    sm: { diameter: 120, strokeWidth: 8, fontSize: 'text-2xl' },
    md: { diameter: 180, strokeWidth: 12, fontSize: 'text-4xl' },
    lg: { diameter: 240, strokeWidth: 16, fontSize: 'text-5xl' },
  };

  const config = sizeConfig[size];
  const radius = (config.diameter - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Color based on score
  const getColor = () => {
    if (score >= 75) return { stroke: '#10b981', text: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Excellent' };
    if (score >= 60) return { stroke: '#3b82f6', text: 'text-blue-600', bg: 'bg-blue-50', label: 'Good' };
    if (score >= 40) return { stroke: '#f59e0b', text: 'text-amber-600', bg: 'bg-amber-50', label: 'Needs Work' };
    return { stroke: '#ef4444', text: 'text-red-600', bg: 'bg-red-50', label: 'High Risk' };
  };

  const color = getColor();

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.diameter, height: config.diameter }}>
        {/* Background Circle */}
        <svg
          className="transform -rotate-90"
          width={config.diameter}
          height={config.diameter}
        >
          <circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={config.strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            stroke={color.stroke}
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`font-bold ${color.text} ${config.fontSize}`}>
            {Math.round(score)}
          </div>
          <div className="text-xs text-muted-foreground font-medium">out of 100</div>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div className={`mt-4 px-4 py-2 rounded-full ${color.bg} ${color.text} font-semibold text-sm`}>
          {color.label}
        </div>
      )}
    </div>
  );
}
