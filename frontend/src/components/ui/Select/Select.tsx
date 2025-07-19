import * as style from './themes/Select.css';

interface Props {
  label: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export const Select = ({ label, value, options, onChange, required }: Props) => (
  <div className={style.selectWrapper}>
    <label className={style.label}>
      {label}
      <select className={style.select} value={value} onChange={onChange} required={required}>
         <option value="">Select {label}</option>
          {options.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
      </select>
    </label>
  </div>
);
