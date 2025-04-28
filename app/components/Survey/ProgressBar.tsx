// /components/Survey/ProgressBar.tsx
type ProgressBarProps = {
    step: number;
    total: number;
  };
  
  const ProgressBar = ({ step, total }: ProgressBarProps) => {
    const percentage = ((step + 1) / total) * 100;
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-4" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step + 1}>
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
          aria-current="step"
        />
      </div>
    );
  };
  
  export default ProgressBar;
  