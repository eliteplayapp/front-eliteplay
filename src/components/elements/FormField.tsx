import { LucideIcon } from "../../lib/libraries";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  icon: Icon
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-zinc-400 font-bold uppercase text-xs tracking-widest ml-1 block">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
        <input
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full bg-zinc-800/50 border border-white/5 h-14 pl-12 pr-4 rounded-xl text-white placeholder:text-zinc-600 focus:border-primary/50 focus:outline-none transition-all font-light"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
