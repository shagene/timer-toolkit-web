'use client';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function ToggleRow({
  label,
  value,
  onChange,
  disabled = false,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <button
        onClick={() => !disabled && onChange(!value)}
        disabled={disabled}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${value
            ? 'bg-primary-600 dark:bg-primary-500'
            : 'bg-gray-200 dark:bg-gray-700'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${value ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}