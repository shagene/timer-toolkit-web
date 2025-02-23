'use client';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  width?: number;
  disabled?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  min = 0,
  max = 999999,
  width = 100,
  disabled = false,
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1" style={{ width: `${width}px` }}>
      <label className="text-sm text-gray-600 dark:text-gray-300">{label}</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-800
                 focus:ring-2 focus:ring-primary-500 focus:border-transparent
                 disabled:bg-gray-100 dark:disabled:bg-gray-900
                 disabled:text-gray-500 dark:disabled:text-gray-400"
      />
    </div>
  );
}